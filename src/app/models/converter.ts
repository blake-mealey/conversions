import { ConverterInput } from './converter-input';
import { ConverterOutput } from './converter-output';
import { Expose, Type } from 'class-transformer';

export class Converter {
  @Expose() public readonly id: string;
  @Expose() public readonly unitTypeId: number;

  @Type(() => ConverterInput)
  @Expose() public readonly input: ConverterInput;

  @Type(() => ConverterOutput)
  @Expose() public readonly outputs: Array<ConverterOutput>;
}
