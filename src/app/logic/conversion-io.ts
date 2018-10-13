import { Conversion } from './conversion';
import { Unit } from '../models/unit';

export class ConversionIo {

  constructor(protected conversion: Conversion) {
    this.unit = this.conversion.unitType.baseUnit;
  }

  protected _unit: Unit;

  get unit(): Unit {
    return this._unit;
  }

  /**
   * when unit changes, update conversion
   */
  set unit(unit: Unit) {
    if (!this.conversion.unitType.validUnit(unit)) {
      throw new Error(`Attempted to use invalid unit ${unit} with unit type ${this.conversion.unitType}`);
    }
    this._unit = unit;
    this.conversion.update();
  }

}
