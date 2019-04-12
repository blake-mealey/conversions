import { Converter } from './converter';
import { Expose, Type } from 'class-transformer';

export class ConverterList {
  @Expose() public readonly id: string;
  @Expose() public readonly displayName: string;

  @Type(() => Converter)
  @Expose() public readonly converters: Array<Converter>;
}
