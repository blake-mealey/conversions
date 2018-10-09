import { BaseModel } from './base-model';
import { ConverterInput } from './converter-input';
import { ConverterOutput } from './converter-output';

export class Converter extends BaseModel{
  public readonly id: string;
  public readonly unitTypeId: number;

  public readonly input: ConverterInput;
  public readonly outputs: Array<ConverterOutput>;

  constructor(model: Object) {
    super(model);

    this.id = this.getRequiredStringProperty('id');
    this.unitTypeId = this.getRequiredNumberProperty('unitTypeId');

    this.input = this.getRequiredModelProperty(ConverterInput, 'input');
    this.outputs = this.getRequiredModelArrayProperty(ConverterOutput, 'outputs');

    this.finishBuilding();
  }
}
