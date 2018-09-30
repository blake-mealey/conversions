import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit-type';
import { EMPTY, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'

@Injectable()
export class UnitsService {
  public unitTypes: Array<UnitType>;

  private ready = new Subject<boolean>();
  public ready$ = this.ready.asObservable();

  constructor(private httpClient: HttpClient) {}

  private getUnitTypesFromServer(): Observable<Array<UnitType>> {
    return this.httpClient.get(CONVERSIONS_SERVER + '/api/Conversions/Types/ConversionGraphs')
      .pipe(
        map<any, Array<UnitType>>(data => {
          return data.map(function (unitTypeConversionGraphModel) {
            return new UnitType(unitTypeConversionGraphModel.unitType, unitTypeConversionGraphModel.conversionGraph);
          });
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        }));
  }

  public init(): void {
    this.getUnitTypesFromServer()
      .subscribe(unitTypes => {
        this.unitTypes = unitTypes;
        setTimeout(() => {
          this.ready.next(true);
        }, 500);
      });
  }
}
