import { BaseModel } from './base-model';

export class SimpleConverter extends BaseModel{
  public readonly inputUnitDisplayName: string;
  public readonly outputUnitDisplayNames: Array<string>;

  constructor(model: Object) {
    super(model);

    this.inputUnitDisplayName = this.getRequiredStringProperty('inputUnitDisplayName');
    this.outputUnitDisplayNames = this.getRequiredArrayProperty('outputUnitDisplayNames');

    this.finishBuilding();
  }
}
