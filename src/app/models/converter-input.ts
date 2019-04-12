import { Expose } from 'class-transformer';

export class ConverterInput {
  @Expose() public readonly unitSymbol: string;
  @Expose() public readonly value: number;
}
