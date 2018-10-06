import { BaseModel } from './base-model';

export class Unit extends BaseModel {
  public readonly symbol: string;
  public readonly displayName: string;

  constructor(model: Object) {
    super(model);

    this.symbol = this.getRequiredStringProperty('symbol');
    this.displayName = this.getRequiredStringProperty('displayName');

    this.finishBuilding()
  }
}




