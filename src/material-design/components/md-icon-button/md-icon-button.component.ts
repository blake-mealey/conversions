import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'md-icon-button',
  styleUrls: [
    './md-icon-button.component.scss'
  ],
  templateUrl: './md-icon-button.component.pug'
})
export class MdIconButtonComponent implements OnInit {

  @Input() icon: string;
  @Output() buttonClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(event) {
    this.buttonClick.emit(event);
  }

}
