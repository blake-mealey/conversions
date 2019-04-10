import { SimpleConverter } from './simple-converter';

export class SimpleConverterList {
  public readonly id: string;
  public readonly displayName: string;

  public readonly converters: Array<SimpleConverter>;
}
