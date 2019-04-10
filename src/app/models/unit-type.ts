import { Unit } from './unit';

export class UnitType {
  public readonly id: number;
  public readonly displayName: string;
  public readonly baseUnit: Unit;
  public readonly units: Array<Unit>;
  private readonly unitsMap: { [ unitId: string ]: Unit };
  public conversionGraph: { [ fromUnitId: string ]: { [ toUnitId: string ]: number } };

  constructor() {
    this.unitsMap = {};
    for (let unit of this.units) {
      this.unitsMap[unit.symbol] = unit;
    }
  }

  validUnit(unit: Unit) {
    return !!this.getUnit(unit.symbol);
  }

  getUnit(id: string) {
    return this.unitsMap[id];
  }
}
