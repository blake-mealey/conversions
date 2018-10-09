import { BaseModel } from './base-model';
import { Converter } from './converter';

export class ConverterList extends BaseModel{
  public readonly id: string;
  public readonly displayName: string;

  public readonly converters: Array<Converter>;

  constructor(model: Object) {
    super(model);

    this.id = this.getRequiredStringProperty('id');
    this.displayName = this.getRequiredStringProperty('displayName');

    this.converters = this.getRequiredModelArrayProperty(Converter, 'converters');

    this.finishBuilding();
  }
}
