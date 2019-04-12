import { Unit } from './unit';
import { Exclude, Expose, Type } from 'class-transformer';

export class UnitType {
  @Expose() public readonly id: number;
  @Expose() public readonly displayName: string;

  @Type(() => Unit)
  @Expose() public readonly baseUnit: Unit;

  @Type(() => Unit)
  @Expose() public readonly units: Array<Unit>;

  @Exclude() public conversionGraph: { [ fromUnitId: string ]: { [ toUnitId: string ]: number } };

  @Exclude() private _unitsMap: { [ unitId: string ]: Unit };
  @Exclude() private get unitsMap() {
    if (!this._unitsMap) {
      this._unitsMap = {};
      for (let unit of this.units) {
        this._unitsMap[unit.symbol] = unit;
      }
    }
    return this._unitsMap;
  }

  public validUnit(unit: Unit): boolean {
    return !!this.getUnit(unit.symbol);
  }

  public getUnit(id: string): Unit {
    return this.unitsMap[id];
  }
}
