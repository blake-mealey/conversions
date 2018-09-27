import { UnitType } from './unit-type';
import { ConversionInput } from './conversion-input';
import { ConversionOutput } from './conversion-output';

export class Conversion {

  /**
   * unit type cannot be null
   * when unit type changes, use default units for new unit type
   */
  private _unitType: UnitType;
  get unitType(): UnitType {
    return this._unitType;
  }
  set unitType(unitType: UnitType) {
    if (unitType && unitType != this._unitType) {
      this._unitType = unitType;
      if (this.input) {
        this.input.unit = unitType.baseUnit;
      }
      for (let output of this.outputs) {
        output.unit = unitType.baseUnit;
      }
    }
  }

  public input: ConversionInput;

  public outputs: Array<ConversionOutput> = [];

  public addOutput() {
    this.outputs.push(new ConversionOutput(this));
  }

  public removeOutput(output: ConversionOutput) {
    // Cannot remove the last output
    if (this.outputs.length == 1) { return; }

    let index = this.outputs.indexOf(output);
    if (index > -1) {
      this.outputs.splice(index, 1);
    }
  }

  /**
   * convert the input to the output, given the current input and output units
   */
  public update() {
    for (let output of this.outputs) {
      output.update(this.input);
    }
  }

  /**
   * Create a new conversion with an initial unit type
   * @param unitType
   */
  constructor(unitType: UnitType) {
    this.unitType = unitType;
    this.input = new ConversionInput(this);
    this.outputs = [
      new ConversionOutput(this)
    ];
  }

}
