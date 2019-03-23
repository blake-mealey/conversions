import { BaseModel } from './base-model';

export class UserAuth extends BaseModel {
  public readonly accessToken: string;
  public readonly displayName: string;
  public readonly profilePictureUrl: string;

  constructor(model: any) {
    super(model);

    this.accessToken = this.getRequiredStringProperty('accessToken');
    this.displayName = this.getOptionalStringProperty('displayName');
    this.profilePictureUrl = this.getOptionalStringProperty('profilePictureUrl');

    this.finishBuilding();
  }
}
