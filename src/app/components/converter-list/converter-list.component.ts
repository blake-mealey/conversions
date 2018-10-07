import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { UnitType } from '../../models/unit-type';
import { UserInputService } from '../../../material-design/services/user-input.service';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'converter-list',
  styleUrls: [
    './converter-list.component.scss'
  ],
  templateUrl: './converter-list.component.pug'
})
export class ConverterListComponent implements OnInit{

  public conversions: Array<Conversion> = [];

  private ready: boolean;

  constructor(private userInputService: UserInputService,
              private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.ready$.subscribe(() => {
      this.init();
    });
  }
  
  init(): void {
    this.ready = true;
    
    let count = 0;
    for (let i = 0; i < count; i++) {
      this.onAddClicked();
    }

    this.userInputService.registerHotkey('a', () => this.onAddClicked());
  }

  onAddClicked() {
    this.conversions.push(new Conversion(this.unitsService.unitTypes[0]));
  }

  onClosed(conversion: Conversion) {
    let index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
