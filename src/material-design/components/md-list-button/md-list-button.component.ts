import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-list-button',
  styleUrls: [
    './md-list-button.component.scss'
  ],
  templateUrl: './md-list-button.component.pug'
})
export class MdListButtonComponent {

  @Input() text: string;

  @Input() icon: string;
  @Input() iconFloatRight: boolean;

  @Input() selected: boolean;

  constructor() {}

}
