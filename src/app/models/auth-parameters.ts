import { BaseModel } from './base-model';

export class AuthParameters extends BaseModel {
  public readonly clientId: string;
  public readonly redirectUri: string;
  public readonly code: string;
  public readonly nonce: string;

  constructor(model: any) {
    super(model);

    this.clientId = this.getRequiredStringProperty('clientId');
    this.redirectUri = this.getRequiredStringProperty('redirectUri');
    this.code = this.getRequiredStringProperty('code');
    this.nonce = this.getRequiredStringProperty('nonce');

    this.finishBuilding();
  }
}
