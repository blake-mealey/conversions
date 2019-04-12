import { SimpleConverter } from './simple-converter';
import { Expose, Type } from 'class-transformer';

export class SimpleConverterList {
  @Expose() public readonly id: string;
  @Expose() public readonly displayName: string;

  @Type(() => SimpleConverter)
  @Expose() public readonly converters: Array<SimpleConverter>;
}
