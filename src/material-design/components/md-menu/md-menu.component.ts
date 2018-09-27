import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { MenuItem } from './menu-item';
import { UserInputService } from '../../services/user-input.service';

@Component({
  selector: 'md-menu',
  styleUrls: [
    './md-menu.component.scss'
  ],
  templateUrl: './md-menu.component.pug'
})
export class MdMenuComponent implements OnInit, AfterViewInit {

  private static readonly SEARCH_ICON = 'search';
  private static readonly CANCEL_ICON = 'cancel';

  @Input() searchEnabled: boolean = false;
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
      }, 5);
    }
  }

  @Output() itemSelected = new EventEmitter<any>();
  @Output() closed = new EventEmitter();

  selectedIndex: number;
  searchIcon: string = MdMenuComponent.SEARCH_ICON;

  _searchValue: string;
  get searchValue(): string {
    return this._searchValue;
  }
  set searchValue(searchValue: string) {
    this._searchValue = searchValue.toLowerCase();
    if (this.searchValue) {
      this.searchIcon = MdMenuComponent.CANCEL_ICON;
      this.displayedItems = this.items.filter((item: MenuItem) => {
        return item.displayName.toLowerCase().indexOf(this.searchValue) > -1;
      });
    } else {
      this.searchIcon = MdMenuComponent.SEARCH_ICON;
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

  onSearchIconClick() {
    this.searchValue = '';
  }

  onItemClick(item: MenuItem) {
    if (item.enabled) {
      this.itemSelected.emit(item.data);
      this.closed.emit();
    }
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
