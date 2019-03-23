import { BaseModel } from './base-model';

export class AuthResponse extends BaseModel {
  public readonly code: string;
  public readonly state: string;

  constructor(model: any) {
    super(model);

    this.code = this.getRequiredStringProperty('code');
    this.state = this.getRequiredStringProperty('state');

    this.finishBuilding();
  }
}
