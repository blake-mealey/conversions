import { Unit } from './unit';
import { BaseModel } from './base-model';

export class UnitType extends BaseModel {
  public readonly displayName: string;
  public readonly baseUnit: Unit;
  public readonly units: Array<Unit>;
  private readonly unitsMap: { [ unitId: number ]: Unit };
  public readonly conversionGraph: { [ fromUnitId: number ]: { [ toUnitId: number ]: number } };

  constructor(model: Object, conversionsGraphModel: any) {
    super(model);

    this.displayName = this.getRequiredStringProperty('displayName');
    this.baseUnit = this.getRequiredModelProperty(Unit, 'baseUnit');
    this.units = this.getRequiredModelArrayProperty(Unit, 'units');

    this.unitsMap = {};
    for (let unit of this.units) {
      this.unitsMap[unit.symbol] = unit;
    }

    // TODO: Type check?
    this.conversionGraph = conversionsGraphModel;

    this.finishBuilding();
  }

  validUnit(unit: Unit) {
    return !!this.getUnit(unit.symbol);
  }

  getUnit(id: number) {
    return this.unitsMap[id];
  }
}
