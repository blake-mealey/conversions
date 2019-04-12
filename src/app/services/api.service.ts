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
import { IdentityProvider } from '../models/identity-provider';
import { ModalService } from '../../app-common/services/modal.service';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { ModelBindingService } from './model-binding.service';

/**
 * Handles all requests to the API, including converting raw data to models
 */
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
              private modalService: ModalService,
              private modelBindingService: ModelBindingService) {}

  private handleError(err: any): ObservableInput<any> {
    this.modalService.showModal(ErrorDialogComponent, {
      name: 'API error',
      message: err.message
    });
    return EMPTY;
  }

  //region Auth API
  public getAuthToken(authParameters: AuthParameters): Observable<UserAuth> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Auth', 'Token')
      .body(authParameters)
      .post()
      .pipe(
        map<any, UserAuth>((model) => this.modelBindingService.bindModelToObject(UserAuth, model)),
        catchError((e) => this.handleError(e)));
  }

  public getIdentityProviders(): Observable<IdentityProvider[]> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'auth', 'IdentityProviders')
      .get()
      .pipe(
        map<any, IdentityProvider[]>((model) => this.modelBindingService.bindModelToArray(IdentityProvider, model)),
        catchError((e) => this.handleError(e)));
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
        map<any, SimpleConverterList[]>((model) => this.modelBindingService.bindModelToArray(SimpleConverterList, model)),
        catchError((e) => this.handleError(e)));
  }

  public getList(id: string): Observable<ConverterList> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists', id)
      .get()
      .pipe(
        map<any, ConverterList>((model) => this.modelBindingService.bindModelToObject(ConverterList, model)),
        catchError((e) => this.handleError(e)));
  }
  //endregion

  //region Units API
  public getUnitTypes(): Observable<UnitType[]> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Conversions', 'Types', 'ConversionGraphs')
      .get()
      .pipe(
        map<any, UnitType[]>((data) => {
          return data.map((model) => {
            const unitType = this.modelBindingService.bindModelToObject(UnitType, model.unitType);
            unitType.conversionGraph = model.conversionGraph;
            return unitType;
          });
        }),
        catchError((e) => this.handleError(e)));
  }
  //endregion
}
