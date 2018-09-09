import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { MenuItem } from '../../models/menu-item';
import { UnitType } from '../../models/unit-type';
import { Unit } from '../../models/unit';

@Component({
  selector: 'converter',
  styleUrls: [
    './converter.component.scss'
  ],
  templateUrl: './converter.component.pug'
})
export class ConverterComponent implements OnInit {

  @Input() conversion: Conversion;
  @Output() closed = new EventEmitter<Conversion>();

  unitTypes: Array<MenuItem> = MenuItem.fromArray(UnitType.ALL_UNIT_TYPES);

  categoriesOpen: boolean = false;
  inputUnitsOpen: boolean = false;
  outputUnitsOpen: boolean = false;

  constructor() {}

  public ngOnInit() {}

  public onCloseClicked() {
    this.closed.emit(this.conversion);
  }

  public onCategoryClicked() {
    this.categoriesOpen = !this.categoriesOpen;
  }

  public onCategoryItemClicked(selectedUnitType: UnitType) {
    this.conversion.unitType = selectedUnitType;
    this.categoriesOpen = false;
  }

  public getUnitItems(): Array<MenuItem> {
    return MenuItem.fromArray(this.conversion.unitType.units);
  }

  public onInputUnitClicked() {
    this.inputUnitsOpen = !this.inputUnitsOpen;
  }

  public onInputUnitItemClicked(selectedInputUnit: Unit) {
    this.conversion.inputUnit = selectedInputUnit;
    this.inputUnitsOpen = false;
  }

  public onOutputUnitClicked() {
    this.outputUnitsOpen = !this.outputUnitsOpen;
  }

  public onOutputUnitItemClicked(selectedOutputUnit: Unit) {
    this.conversion.outputUnit = selectedOutputUnit;
    this.outputUnitsOpen = false;
  }
}
