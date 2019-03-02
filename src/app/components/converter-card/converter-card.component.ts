import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversion } from '../../logic/conversion';
import { MenuItem } from '../../../material-design/components/md-menu/menu-item';
import { UnitType } from '../../models/unit-type';
import { Unit } from '../../models/unit';
import { ConversionOutput } from '../../logic/conversion-output';
import { UnitsService } from '../../services/units.service';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { slideIn, slideOut } from '../../../app-common/animations';

enum MoreMenuItem {
  ADD_OUTPUT,
  SWAP
}

@Component({
  selector: 'converter-card',
  styleUrls: [
    './converter-card.component.scss'
  ],
  templateUrl: './converter-card.component.pug',
  animations: [
    trigger('slideIn', [
      state('open', style({})),

      transition(':enter', [
        useAnimation(slideIn)
      ]),

      transition(':leave', [
        useAnimation(slideOut)
      ])
    ])
  ]
})
export class ConverterCardComponent implements AfterViewInit {

  @Input() conversion: Conversion;
  @Output() closed = new EventEmitter<Conversion>();

  categoriesOpen: boolean;

  unitTypes: Array<MenuItem> = MenuItem.fromArray(this.unitsService.unitTypes);
  moreMenuItems: Array<MenuItem>;

  constructor(private unitsService: UnitsService) {
    this.moreMenuItems = [
      new MenuItem(MoreMenuItem.ADD_OUTPUT, 'Add output', 'add'),
      new MenuItem(MoreMenuItem.SWAP, 'Swap', 'swap_vert', this.oneOutput, this),
    ];
  }

  ngAfterViewInit(): void {
    // this.categoriesOpen = true;
  }

  oneOutput(): boolean {
    if (this.conversion) {
      return this.conversion.outputs.length == 1;
    }
  }

  onCloseClicked() {
    this.closed.emit(this.conversion);
  }

  onCategorySelected(selectedUnitType: UnitType) {
    this.conversion.unitType = selectedUnitType;
  }

  onMoreMenuItemSelected(item: MoreMenuItem) {
    switch (item) {
      case MoreMenuItem.ADD_OUTPUT:
        this.onAdd();
        break;
      case MoreMenuItem.SWAP:
        this.onSwap();
        break;
    }
  }

  onAdd() {
    this.conversion.addOutput();
  }

  onSwap() {
    if (this.oneOutput()) {
      let input = this.conversion.input;
      let output = this.conversion.outputs[0];

      input.value = output.value;

      let inputUnit = input.unit;
      input.unit = output.unit;
      output.unit = inputUnit;
    }
  }

  getUnitItems(): Array<MenuItem> {
    return MenuItem.fromArray(this.conversion.unitType.units);
  }

  onInputUnitSelected(selectedInputUnit: Unit) {
    this.conversion.input.unit = selectedInputUnit;
  }

  onRemoveOutputClicked(output: ConversionOutput) {
    this.conversion.removeOutput(output);
  }

  onOutputUnitSelected(output: ConversionOutput, selectedOutputUnit: Unit) {
    output.unit = selectedOutputUnit;
  }

  copyText(text: string) {
    console.log("COPY TO CLIPBOARD: " + text);
  }

  onCopyInput() {
    this.copyText(this.conversion.input.value.toString());
  }

  onCopyOutput(output: ConversionOutput) {
    this.copyText(output.value.toString());
  }
}
