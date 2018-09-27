import { BaseModel } from './base-model';

export class Unit extends BaseModel {
  public readonly id: number;
  public readonly displayName: string;
  public readonly symbol: string;

  constructor(model: Object) {
    super(model);

    this.id = this.getRequiredNumberProperty('id');
    this.displayName = this.getRequiredStringProperty('displayName');
    this.symbol = this.getRequiredStringProperty('symbol');

    this.finishBuilding()
  }
}




