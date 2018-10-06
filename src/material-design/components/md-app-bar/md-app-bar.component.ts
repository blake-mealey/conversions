import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-app-bar',
  styleUrls: [
    './md-app-bar.component.scss'
  ],
  templateUrl: './md-app-bar.component.pug'
})
export class MdAppBarComponent implements OnInit {

  @Input() title: string;

  constructor() {}

  ngOnInit() {}

}
