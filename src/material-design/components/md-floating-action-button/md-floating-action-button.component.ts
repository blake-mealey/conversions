import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-floating-action-button',
  styleUrls: [
    './md-floating-action-button.component.scss'
  ],
  templateUrl: './md-floating-action-button.component.pug'
})
export class MdFloatingActionButtonComponent {
  @Input() mini: boolean = false;
  @Input() icon: string;

  constructor() {}
}
