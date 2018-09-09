import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { MenuItem } from '../../../material/components/menu/menu-item';
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

  constructor() {}

  public ngOnInit() {}

  public onCloseClicked() {
    this.closed.emit(this.conversion);
  }

  public onSwapClicked() {
    this.conversion.input = this.conversion.output;

    let inputUnit = this.conversion.inputUnit;
    this.conversion.inputUnit = this.conversion.outputUnit;
    this.conversion.outputUnit = inputUnit;
  }

  public onCopyClicked() {
    // TODO: Copy output to clipboard
  }

  public onCategorySelected(selectedUnitType: UnitType) {
    this.conversion.unitType = selectedUnitType;
  }

  public getUnitItems(): Array<MenuItem> {
    return MenuItem.fromArray(this.conversion.unitType.units);
  }

  public onInputUnitSelected(selectedInputUnit: Unit) {
    this.conversion.inputUnit = selectedInputUnit;
  }

  public onOutputUnitSelected(selectedOutputUnit: Unit) {
    this.conversion.outputUnit = selectedOutputUnit;
  }
}
