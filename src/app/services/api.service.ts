import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit-type';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ConverterList } from '../models/converter-list';
import { HttpRequest } from './http-request';

/**
 * Handles all requests to the API, including converting raw data to models
 */
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //region Helpers
  private static handleError(err): ObservableInput<any> {
    // TODO: Better error handling
    console.log(err);
    return EMPTY;
  }
  //endregion

  //region Lists API
  public getLists(pageIndex: number, pageLength: number): Observable<Array<ConverterList>> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists')
      .parameter('pageIndex', pageIndex)
      .parameter('pageLength', pageLength)
      .get()
      .pipe(
        map<any, Array<ConverterList>>(data => {
          return data.map(function (list) {
            return new ConverterList(list);
          });
        }),
        catchError(ApiService.handleError));
  }

  public getList(id: string): Observable<ConverterList> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists', id)
      .get()
      .pipe(
        map<any, ConverterList>(data => {
          return new ConverterList(data);
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        }));
  }
  //endregion

  //region Units API
  public getUnitTypes(): Observable<Array<UnitType>> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Conversions', 'Types', 'ConversionGraphs')
      .get()
      .pipe(
        map<any, Array<UnitType>>(data => {
          return data.map(function (unitTypeConversionGraphModel) {
            return new UnitType(unitTypeConversionGraphModel.unitType, unitTypeConversionGraphModel.conversionGraph);
          });
        }),
        catchError(ApiService.handleError));
  }
  //endregion
}
