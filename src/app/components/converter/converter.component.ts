import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ConverterComponent implements AfterViewInit {

  @Input() conversion: Conversion;
  @Output() closed = new EventEmitter<Conversion>();

  categoriesOpen: boolean;

  unitTypes: Array<MenuItem> = MenuItem.fromArray(UnitType.ALL_UNIT_TYPES);

  constructor() {}

  ngAfterViewInit(): void {
    this.categoriesOpen = true;
  }

  onCloseClicked() {
    this.closed.emit(this.conversion);
  }

  onSwapClicked() {
    this.conversion.input = this.conversion.output;

    let inputUnit = this.conversion.inputUnit;
    this.conversion.inputUnit = this.conversion.outputUnit;
    this.conversion.outputUnit = inputUnit;
  }

  onCopyClicked() {
    // TODO: Copy output to clipboard
  }

  onCategorySelected(selectedUnitType: UnitType) {
    this.conversion.unitType = selectedUnitType;
  }

  getUnitItems(): Array<MenuItem> {
    return MenuItem.fromArray(this.conversion.unitType.units);
  }

  onInputUnitSelected(selectedInputUnit: Unit) {
    this.conversion.inputUnit = selectedInputUnit;
  }

  onOutputUnitSelected(selectedOutputUnit: Unit) {
    this.conversion.outputUnit = selectedOutputUnit;
  }
}
