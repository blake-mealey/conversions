import { BaseModel } from './base-model';

export class IdentityProvider extends BaseModel {
  public readonly clientId: string;
  public readonly authorizationEndpoint: string;

  constructor(model: any) {
    super(model);

    this.clientId = this.getRequiredStringProperty('clientId');
    this.authorizationEndpoint = this.getRequiredStringProperty('authorizationEndpoint');

    this.finishBuilding();
  }
}
