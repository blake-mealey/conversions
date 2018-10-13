import { BaseModel } from './base-model';
import { SimpleConverter } from './simple-converter';

export class SimpleConverterList extends BaseModel {
  public readonly id: string;
  public readonly displayName: string;

  public readonly converters: Array<SimpleConverter>;

  constructor(model: Object) {
    super(model);

    this.id = this.getRequiredStringProperty('id');
    this.displayName = this.getRequiredStringProperty('displayName');

    this.converters = this.getRequiredModelArrayProperty(SimpleConverter, 'converters');

    this.finishBuilding();
  }
}
