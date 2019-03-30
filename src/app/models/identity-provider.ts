import { BaseModel } from './base-model';

export class IdentityProvider extends BaseModel {
  public readonly clientId: string;
  public readonly displayName: string;
  public readonly iconUrl: string;
  public readonly authorizeUrl: string;

  constructor(model: any) {
    super(model);

    this.clientId = this.getRequiredStringProperty('clientId');
    this.displayName = this.getRequiredStringProperty('displayName');
    this.iconUrl = this.getRequiredStringProperty('iconUrl');
    this.authorizeUrl = this.getRequiredStringProperty('authorizeUrl');

    this.finishBuilding();
  }
}
