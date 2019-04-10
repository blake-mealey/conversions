import { ConverterInput } from './converter-input';
import { ConverterOutput } from './converter-output';

export class Converter {
  public readonly id: string;
  public readonly unitTypeId: number;

  public readonly input: ConverterInput;
  public readonly outputs: Array<ConverterOutput>;
}
