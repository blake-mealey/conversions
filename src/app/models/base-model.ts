export class BaseModel {
  constructor(protected model: Object) {}

  private static checkType(value: any, name: string, type?: string) {
    if (!type) return;
    let isType = type == 'array' ? Array.isArray(value) : typeof value == type;
    if (!isType) {
      throw new Error(`Expected property '${name}' to be of type: ${type}`);
    }
  }

  private getRequiredProperty(name: string, type?: string): any {
    let value = this.model[name];
    if (value == undefined || value == null) {
      throw new Error(`Missing required property: ${name}`);
    }
    BaseModel.checkType(value, name, type);
    return value;
  }

  private getOptionalProperty(name: string, type?: string, defaultValue?: any): any {
    let value = this.model[name];
    if (value === undefined || value === null) {
      return defaultValue;
    }
    BaseModel.checkType(value, name, type);
    return value;
  }

  protected getRequiredStringProperty(name: keyof this) {
    return this.getRequiredProperty(name, 'string');
  }

  protected getRequiredNumberProperty(name: keyof this) {
    return this.getRequiredProperty(name, 'number');
  }

  protected getRequiredBooleanProperty(name: keyof this) {
    return this.getRequiredProperty(name, 'boolean');
  }

  protected getRequiredArrayProperty(name: keyof this) {
    return this.getRequiredProperty(name, 'array');
  }

  protected getRequiredModelArrayProperty(classRef: { new (model: Object) }, name: keyof this) {
    return this.getRequiredArrayProperty(name).map(function (model) {
      return new classRef(model);
    });
  }

  protected getRequiredObjectProperty(name: keyof this) {
    return this.getRequiredProperty(name, 'object');
  }

  protected getRequiredModelProperty(classRef: { new (model: Object) }, name: keyof this) {
    return new classRef(this.getRequiredObjectProperty(name));
  }

  protected getOptionalStringProperty(name: keyof this, defaultValue?: string) {
    return this.getOptionalProperty(name, 'string');
  }

  protected getOptionalNumberProperty(name: keyof this, defaultValue?: number) {
    return this.getOptionalProperty(name, 'number');
  }

  protected getOptionalBooleanProperty(name: keyof this, defaultValue?: boolean) {
    return this.getOptionalProperty(name, 'boolean');
  }

  protected getOptionalArrayProperty(name: keyof this, defaultValue?: Array<any>) {
    return this.getOptionalProperty(name, 'array');
  }

  protected getOptionalObjectProperty(name: keyof this, defaultValue?: Object) {
    return this.getOptionalProperty(name, 'object', defaultValue);
  }

  protected getOptionalModelProperty(classRef: { new (model: Object) }, name: keyof this, defaultValue?: BaseModel) {
    let object = this.getOptionalObjectProperty(name, defaultValue);
    if (!object) return defaultValue;
    return new classRef(object);
  }

  protected finishBuilding() {
    delete this.model;
  }
}
