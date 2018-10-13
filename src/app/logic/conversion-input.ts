import { Conversion } from './conversion';
import { ConversionIo } from './conversion-io';

export class ConversionInput extends ConversionIo {

  constructor(protected conversion: Conversion, protected _value: number = 1) {
    super(conversion);
  }

  get value(): number {
    return this._value;
  }

  /**
   * when value changes, update conversion
   */
  set value(value: number) {
    this._value = value;
    this.conversion.update();
  }

}
