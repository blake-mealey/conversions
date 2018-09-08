import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-button',
  styleUrls: [
    './icon-button.component.scss'
  ],
  templateUrl: './icon-button.component.pug'
})
export class IconButtonComponent implements OnInit {

  @Input() icon: string;

  constructor() {}

  public ngOnInit() {}

}
