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
    if (value == undefined || value == null) {
      return defaultValue;
    }
    BaseModel.checkType(value, name, type);
    return value;
  }

  public getRequiredStringProperty(name: string) {
    return this.getRequiredProperty(name, 'string');
  }

  public getRequiredNumberProperty(name: string) {
    return this.getRequiredProperty(name, 'number');
  }

  public getRequiredBooleanProperty(name: string) {
    return this.getRequiredProperty(name, 'boolean');
  }

  public getRequiredArrayProperty(name: string) {
    return this.getRequiredProperty(name, 'array');
  }

  public getRequiredModelArrayProperty(classRef: { new (model: Object) }, name: string) {
    return this.getRequiredArrayProperty(name).map(function (model) {
      return new classRef(model);
    });
  }

  public getRequiredObjectProperty(name: string) {
    return this.getRequiredProperty(name, 'object');
  }

  public getRequiredModelProperty(classRef: { new (model: Object) }, name: string) {
    return new classRef(this.getRequiredObjectProperty(name));
  }

  public getOptionalStringProperty(name: string, defaultValue?: string) {
    return this.getOptionalProperty(name, 'string');
  }

  public getOptionalNumberProperty(name: string, defaultValue?: number) {
    return this.getOptionalProperty(name, 'number');
  }

  public getOptionalBooleanProperty(name: string, defaultValue?: boolean) {
    return this.getOptionalProperty(name, 'boolean');
  }

  public getOptionalArrayProperty(name: string, defaultValue?: Array<any>) {
    return this.getOptionalProperty(name, 'array');
  }

  public getOptionalObjectProperty(name: string, defaultValue?: Object) {
    return this.getOptionalProperty(name, 'object', defaultValue);
  }

  public getOptionalModelProperty(classRef: { new (model: Object) }, name: string, defaultValue?: BaseModel) {
    let object = this.getOptionalObjectProperty(name, defaultValue);
    if (!object) return defaultValue;
    return new classRef(object);
  }

  public finishBuilding() {
    delete this.model;
  }
}
