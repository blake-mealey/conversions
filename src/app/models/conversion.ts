import { UnitType } from './unit-type';
import { Unit } from './unit';

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
      this.inputUnit = unitType.defaultUnit;
      this.outputUnit = unitType.defaultUnit;
    }
  }

  /**
   * when input unit changes, update input
   */
  private _inputUnit: Unit;
  get inputUnit(): Unit {
    return this._inputUnit;
  }
  set inputUnit(inputUnit: Unit) {
    this._inputUnit = inputUnit;
    this.convertInputToOutput();
  }

  /**
   * when output unit changes, update output
   */
  private _outputUnit: Unit;
  get outputUnit(): Unit {
    return this._outputUnit;
  }
  set outputUnit(outputUnit: Unit) {
    this._outputUnit = outputUnit;
    this.convertInputToOutput();
  }

  /**
   * when input changes, update output
   */
  private _input: number;
  get input(): number {
    return this._input;
  }
  set input(input: number) {
    this._input = input;
    this.convertInputToOutput();
  }

  /**
   * output can only be modified in `convertInputToOutput`
   */
  private _output: number;
  get output(): number {
    return this._output;
  }

  /**
   * convert the input to the output, given the current input and output units
   */
  private convertInputToOutput() {
    if (this.input != null && this.input != undefined) {
      this._output = this.input * this.inputUnit.relativeToDefault * this.outputUnit.inverseRelativeToDefault;
    } else {
      this._output = null;
    }
  }

  /**
   * Create a new conversion with an initial unit type
   * @param unitType
   */
  constructor(unitType: UnitType) {
    this.unitType = unitType;
    this.input = 1;
  }

}
