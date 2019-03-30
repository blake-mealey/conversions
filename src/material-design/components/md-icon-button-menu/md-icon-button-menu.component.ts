import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../md-menu/menu-item';

@Component({
  selector: 'md-icon-button-menu',
  styleUrls: [
    './md-icon-button-menu.component.scss'
  ],
  templateUrl: './md-icon-button-menu.component.pug'
})
export class MdIconButtonMenuComponent implements OnInit {

  @Input() icon: string;
  @Input() image: string;

  @Input() open: boolean = false;
  @Input() items: Array<MenuItem>;
  @Input() searchEnabled: boolean = false;

  @Output() itemSelected = new EventEmitter<any>();

  openDisabledDebounce: boolean;

  constructor() {}

  ngOnInit() {}

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
