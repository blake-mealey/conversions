import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'md-icon-button',
  styleUrls: [
    './md-icon-button.component.scss'
  ],
  templateUrl: './md-icon-button.component.pug'
})
export class MdIconButtonComponent {

  @Input() icon: string;
  @Input() rippleColor: string;
  @Output() buttonClick = new EventEmitter();

  constructor() {}

  onClick(event) {
    this.buttonClick.emit(event);
  }

}
