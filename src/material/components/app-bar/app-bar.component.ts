import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  styleUrls: [
    './app-bar.component.scss'
  ],
  templateUrl: './app-bar.component.pug'
})
export class AppBarComponent implements OnInit {

  @Input() title: string;

  constructor() {}

  public ngOnInit() {}

}
