import { BaseModel } from './base-model';

export class ConverterInput extends BaseModel {
  public readonly unitSymbol: string;
  public readonly value: number;

  constructor(model: Object) {
    super(model);

    this.unitSymbol = this.getRequiredStringProperty('unitSymbol');
    this.value = this.getRequiredNumberProperty('value');

    this.finishBuilding();
  }
}
