import { Expose } from 'class-transformer';

export class ConverterOutput {
  @Expose() public readonly id: string;
  @Expose() public readonly unitSymbol: string;
}
