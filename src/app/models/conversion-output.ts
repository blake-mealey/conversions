import { Conversion } from './conversion';
import { ConversionIo } from './conversion-io';
import { ConversionInput } from './conversion-input';

export class ConversionOutput extends ConversionIo {

  constructor(protected conversion: Conversion, protected _value: number = null) {
    super(conversion);
    this.update(this.conversion.input);
  }

  get value(): number {
    return this._value;
  }

  /**
   * update the value of this output, given an input value and unit
   */
  public update(input: ConversionInput) {
    if (input.value != null && input.value != undefined) {
      this._value = input.value * input.unit.relativeToDefault * this.unit.inverseRelativeToDefault;
    } else {
      this._value = null;
    }
  }
}
