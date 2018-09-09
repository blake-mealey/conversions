import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { UnitType } from '../../models/unit-type';

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
    let count = 0;
    for (let i = 0; i < count; i++) {
      this.onAddClicked();
    }
  }

  public onAddClicked() {
    this.conversions.push(new Conversion(UnitType.LENGTH));
  }

  public onClosed(conversion: Conversion) {
    let index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
