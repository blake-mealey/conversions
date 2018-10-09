import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-chip',
  styleUrls: [
    './md-chip.component.scss'
  ],
  templateUrl: './md-chip.component.pug'
})
export class MdChipComponent {

  @Input() text: string;

  constructor() {}

}
