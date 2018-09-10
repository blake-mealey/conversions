import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../md-menu/menu-item';

@Component({
  selector: 'md-raised-button-menu',
  styleUrls: [
    './md-raised-button-menu.component.scss'
  ],
  templateUrl: './md-raised-button-menu.component.pug'
})
export class MdRaisedButtonMenuComponent implements OnInit {

  @Input() allowLowercase: boolean;
  @Input() text: string;

  @Input() open: boolean = false;
  @Input() items: Array<MenuItem>;
  @Input() searchEnabled: boolean = false;

  @Output() itemSelected = new EventEmitter<any>();

  openDisabledDebounce: boolean;

  constructor() {}

  public ngOnInit() {}

  onButtonClicked() {
    if (!this.open && !this.openDisabledDebounce) {
      this.open = true;
    }
  }

  onMenuClosed() {
    this.open = false;
    this.openDisabledDebounce = true;
    setTimeout(() => {
      this.openDisabledDebounce = false;
    }, 5);
  }

  onItemSelected(data) {
    this.itemSelected.emit(data);
  }

}
