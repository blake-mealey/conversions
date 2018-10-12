import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit-type';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class UnitsService {
  public unitTypes: Array<UnitType>;
  public unitTypesMap: { [ unitTypeId: number ]: UnitType };

  private ready = new BehaviorSubject(false);
  public ready$ = this.ready.asObservable();

  constructor(private apiService: ApiService) {}

  public init(): void {
    this.apiService.getUnitTypes()
      .subscribe(unitTypes => {
        this.unitTypes = unitTypes;

        this.unitTypesMap = {};
        for (let unitType of this.unitTypes) {
          this.unitTypesMap[unitType.id] = unitType;
        }

        setTimeout(() => {
          this.ready.next(true);
        }, 500);
      });
  }

  getUnitType(unitTypeId: number) {
    return this.unitTypes.find((unitType: UnitType) => {
      return unitType.id == unitTypeId;
    });
  }
}
