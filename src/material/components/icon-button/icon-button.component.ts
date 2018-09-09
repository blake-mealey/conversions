import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'icon-button',
  styleUrls: [
    './icon-button.component.scss'
  ],
  templateUrl: './icon-button.component.pug'
})
export class IconButtonComponent implements OnInit {

  @Input() icon: string;
  @Output() buttonClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(event) {
    this.buttonClick.emit(event);
  }

}
