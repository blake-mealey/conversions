import { Conversion } from './conversion';
import { ConversionIo } from './conversion-io';
import { ConversionInput } from './conversion-input';
import { Unit } from './unit';

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
      let unitType = this.conversion.unitType;
      let conversionGraph = unitType.conversionGraph;

      // Search the conversion graph for the conversion
      let path: { [ symbol: string ]: string } = {};
      let queue: Array<string> = [input.unit.symbol];
      while (queue.length > 0) {
        let fromUnitSymbol = queue.shift();

        if (fromUnitSymbol == this.unit.symbol) {
          break;
        }

        for (let toUnitSymbol in conversionGraph[fromUnitSymbol]) {
          if (path[toUnitSymbol]) continue;
          path[toUnitSymbol] = fromUnitSymbol;
          queue.push(toUnitSymbol);
        }
      }

      // Construct the multiplier from the path
      let multiplier = 1;
      let toUnitSymbol: string = this.unit.symbol;
      let multipliers = [];
      while (toUnitSymbol != input.unit.symbol) {
        let fromUnitId = path[toUnitSymbol];
        let thisMultiplier = conversionGraph[fromUnitId][toUnitSymbol];
        multipliers.push(thisMultiplier);
        multiplier *= thisMultiplier;
        toUnitSymbol = fromUnitId;
      }

      // Multiply the input by the conversion multiplier
      this._value = input.value * multiplier;

      // Log the multiplier path
      console.log(`${this._value} = ${input.value} * (${multipliers.reverse().join(' * ')})`);
    } else {
      this._value = null;
    }
  }
}
