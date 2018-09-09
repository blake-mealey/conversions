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

  constructor() {}

  public ngOnInit() {}

  onButtonClicked() {
    this.open = !this.open;
  }

  onItemClicked(data) {
    this.open = false;
    this.itemSelected.emit(data);
  }

}
