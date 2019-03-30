import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-raised-button',
  styleUrls: [
    './md-raised-button.component.scss'
  ],
  templateUrl: './md-raised-button.component.pug'
})
export class MdRaisedButtonComponent {

  @Input() allowLowercase: boolean;

  @Input() text: string;

  @Input() icon: string;
  @Input() iconFloatRight: boolean;

  constructor() {}

}
