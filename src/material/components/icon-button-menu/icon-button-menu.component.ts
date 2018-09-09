import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../menu/menu-item';

@Component({
  selector: 'icon-button-menu',
  styleUrls: [
    './icon-button-menu.component.scss'
  ],
  templateUrl: './icon-button-menu.component.pug'
})
export class IconButtonMenuComponent implements OnInit {

  @Input() icon: string;

  @Input() open: boolean;
  @Input() items: Array<MenuItem>;
  @Input() searchEnabled: boolean;

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
