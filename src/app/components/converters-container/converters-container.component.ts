import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../models/conversion';

@Component({
  selector: 'converters-container',
  styleUrls: [
    './converters-container.component.scss'
  ],
  templateUrl: './converters-container.component.pug'
})
export class ConvertersContainerComponent implements OnInit{

  public conversions: Array<Conversion> = [];

  constructor() {}

  ngOnInit(): void {
    this.onAddClicked();
    this.onAddClicked();
    this.onAddClicked();
    this.onAddClicked();
  }

  public onAddClicked() {
    this.conversions.push(new Conversion());
  }

  public onClosed(conversion: Conversion) {
    let index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
