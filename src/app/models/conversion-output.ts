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
      let path: { [ id: number ]: number } = {};
      let queue: Array<number> = [input.unit.id];
      while (queue.length > 0) {
        let fromUnitId = queue.shift();

        if (fromUnitId == this.unit.id) {
          break;
        }

        for (let id in conversionGraph[fromUnitId]) {
          let toUnitId = Number(id);
          if (path[toUnitId]) continue;
          path[toUnitId] = fromUnitId;
          queue.push(toUnitId);
        }
      }

      // Construct the multiplier from the path
      let multiplier = 1;
      let toUnitId: number = this.unit.id;
      let multipliers = [];
      while (toUnitId != input.unit.id) {
        let fromUnitId = path[toUnitId];
        let thisMultiplier = conversionGraph[fromUnitId][toUnitId];
        multipliers.push(thisMultiplier);
        multiplier *= thisMultiplier;
        toUnitId = fromUnitId;
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
