import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-backdrop-component',
  styleUrls: [
    './md-backdrop.component.scss'
  ],
  templateUrl: './md-backdrop.component.pug'
})
export class MdBackdropComponent implements OnInit {

  @Input() header: string;

  constructor() {}

  public ngOnInit() {}

}
