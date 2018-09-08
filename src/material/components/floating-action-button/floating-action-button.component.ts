import { Component, Input } from '@angular/core';

@Component({
  selector: 'floating-action-button',
  styleUrls: [
    './floating-action-button.component.scss'
  ],
  templateUrl: './floating-action-button.component.pug'
})
export class FloatingActionButtonComponent {
  @Input() mini: boolean = false;
  @Input() icon: string;

  constructor() {}
}
