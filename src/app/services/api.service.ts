import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit-type';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ConverterList } from '../models/converter-list';
import { HttpRequest } from './http-request';
import { SimpleConverterList } from '../models/simple-converter-list';
import { AuthParameters } from 'app/models/auth-parameters';
import { UserAuth } from 'app/models/user-auth';

/**
 * Handles all requests to the API, including converting raw data to models
 */
@Injectable()
export class ApiService {
  private static handleError(err: any): ObservableInput<any> {
    // TODO: Better error handling
    console.log(err);
    return EMPTY;
  }

  constructor(private httpClient: HttpClient) {}

  //region Auth API
  public getAuthToken(authParameters: AuthParameters): Observable<UserAuth> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Auth', 'Token')
      .body(authParameters)
      .post()
      .pipe(
        map<any, UserAuth>((data) => {
          return new UserAuth(data);
        }),
        catchError(ApiService.handleError));

  }
  //endregion

  //region Lists API
  public getLists(pageIndex: number, pageLength: number): Observable<Array<SimpleConverterList>> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists')
      .parameter('pageIndex', pageIndex)
      .parameter('pageLength', pageLength)
      .get()
      .pipe(
        map<any, SimpleConverterList[]>((data) => {
          return data.map(function(list: any) {
            return new SimpleConverterList(list);
          });
        }),
        catchError(ApiService.handleError));
  }

  public getList(id: string): Observable<ConverterList> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists', id)
      .get()
      .pipe(
        map<any, ConverterList>((data) => {
          return new ConverterList(data);
        }),
        catchError(ApiService.handleError));
  }
  //endregion

  //region Units API
  public getUnitTypes(): Observable<UnitType[]> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Conversions', 'Types', 'ConversionGraphs')
      .get()
      .pipe(
        map<any, UnitType[]>((data) => {
          return data.map(function(unitTypeConversionGraphModel: any) {
            return new UnitType(
              unitTypeConversionGraphModel.unitType,
              unitTypeConversionGraphModel.conversionGraph);
          });
        }),
        catchError(ApiService.handleError));
  }
  //endregion
}
