import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { UnitType } from '../../models/unit-type';
import { UserInputService } from '../../../material-design/services/user-input.service';

@Component({
  selector: 'converters-container',
  styleUrls: [
    './converters-container.component.scss'
  ],
  templateUrl: './converters-container.component.pug'
})
export class ConvertersContainerComponent implements OnInit{

  public conversions: Array<Conversion> = [];

  constructor(private userInputService: UserInputService) {}

  ngOnInit(): void {
    let count = 0;
    for (let i = 0; i < count; i++) {
      this.onAddClicked();
    }

    this.userInputService.registerHotkey('a', () => this.onAddClicked());
  }

  onAddClicked() {
    this.conversions.push(new Conversion(UnitType.LENGTH));
  }

  onClosed(conversion: Conversion) {
    let index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
