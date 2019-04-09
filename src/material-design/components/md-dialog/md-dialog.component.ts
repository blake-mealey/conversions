import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-dialog',
  styleUrls: [
    './md-dialog.component.scss'
  ],
  templateUrl: './md-dialog.component.pug'
})
export class MdDialogComponent implements OnInit {

  @Input() header: string;

  constructor() {}

  public ngOnInit() {}

}
