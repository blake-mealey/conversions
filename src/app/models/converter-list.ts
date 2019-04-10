import { Converter } from './converter';

export class ConverterList {
  public readonly id: string;
  public readonly displayName: string;

  public readonly converters: Array<Converter>;
}
