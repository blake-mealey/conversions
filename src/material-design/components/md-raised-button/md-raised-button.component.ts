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

  private _text: string;
  get text(): string {
    return this.allowLowercase ? this._text : this._text.toUpperCase();
  }
  @Input() set text(text: string) {
    this._text = text;
  }

  @Input() icon: string;
  @Input() iconFloatRight: boolean;

  constructor() {}

}
