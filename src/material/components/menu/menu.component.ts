import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { MenuItem } from './menu-item';
import { UserInputService } from '../../services/user-input.service';

@Component({
  selector: 'menu',
  styleUrls: [
    './menu.component.scss'
  ],
  templateUrl: './menu.component.pug'
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() searchEnabled: boolean;
  @Input() items: Array<MenuItem>;
  displayedItems: Array<MenuItem>;

  private _open: boolean;
  get open(): boolean {
    return this._open;
  }
  @Input() set open(open: boolean) {
    this._open = open;
    if (open && this.input) {
      this.searchValue = '';
      this.selectedIndex = 0;
      setTimeout(() => {
        this.input.nativeElement.focus();
      }, 10);
    }
  }

  @Output() itemSelected = new EventEmitter<any>();
  @Output() closed = new EventEmitter();

  selectedIndex: number;

  _searchValue: string;
  get searchValue(): string {
    return this._searchValue;
  }
  set searchValue(searchValue: string) {
    this._searchValue = searchValue.toLowerCase();
    if (this.searchValue) {
      this.displayedItems = this.items.filter((item: MenuItem) => {
        return item.displayName.toLowerCase().indexOf(this.searchValue) > -1;
      });
    } else {
      this.displayedItems = this.items;
    }
    if (this.displayedItems.length == 0) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = Math.min(Math.max(this.selectedIndex, 0), this.displayedItems.length - 1);
    }
  }

  @ViewChild('input') input: ElementRef;

  constructor(private elementRef: ElementRef,
              private userInputService: UserInputService) {

    userInputService.mouseClick$.subscribe((event) => {
      if (this.open && !this.elementRef.nativeElement.contains(event.target)) {
        this.closed.emit();
      }
    });
  }

  ngOnInit(): void {
    this.displayedItems = this.items;
  }

  onItemClick(item: MenuItem) {
    this.itemSelected.emit(item.data);
    this.closed.emit();
  }

  ngAfterViewInit(): void {
    if (!this.input) { return; }

    this.input.nativeElement.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowDown':
          this.selectedIndex = (this.selectedIndex + 1) % this.displayedItems.length;
          break;
        case 'ArrowUp':
          if (--this.selectedIndex < 0) this.selectedIndex += this.displayedItems.length;
          break;
        case 'Enter':
          if (this.selectedIndex > -1) {
            this.onItemClick(this.displayedItems[this.selectedIndex]);
          }
          break;
      }
    });
  }

}
