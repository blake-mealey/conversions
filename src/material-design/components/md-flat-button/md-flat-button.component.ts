import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-flat-button',
  styleUrls: [
    './md-flat-button.component.scss'
  ],
  templateUrl: './md-flat-button.component.pug'
})
export class MdFlatButtonComponent {

  @Input() allowLowercase: boolean;

  @Input() text: string;

  @Input() isDark: boolean;
  @Input() isOutlined: boolean;

  constructor() {}

}
