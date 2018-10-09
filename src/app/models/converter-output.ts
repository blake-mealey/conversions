import { BaseModel } from './base-model';

export class ConverterOutput extends BaseModel {
  public readonly id: string;
  public readonly unitSymbol: string;

  constructor(model: Object) {
    super(model);

    this.id = this.getRequiredStringProperty('id');
    this.unitSymbol = this.getRequiredStringProperty('unitSymbol');

    this.finishBuilding();
  }
}
