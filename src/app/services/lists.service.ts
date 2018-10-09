import { Injectable } from '@angular/core';
import { ConverterList } from '../models/converter-list';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'

@Injectable()
export class ListsService {
  public publicLists: Array<ConverterList>;
  public publicListsMap: { [ listId: string ]: ConverterList };

  private ready = new BehaviorSubject(false);
  public ready$ = this.ready.asObservable();

  constructor(private httpClient: HttpClient) {}

  private getPublicListsFromServer(): Observable<Array<ConverterList>> {
    return this.httpClient.get(CONVERSIONS_SERVER + '/api/Lists/?pageIndex=0&pageLength=10')
      .pipe(
        map<any, Array<ConverterList>>(data => {
          return data.map(function (list) {
            return new ConverterList(list);
          });
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        }));
  }

  public init(): void {
    this.getPublicListsFromServer()
      .subscribe(lists => {
        this.publicLists = lists;

        this.publicListsMap = {};
        for (let list of this.publicLists) {
          this.publicListsMap[list.id] = list;
        }

        setTimeout(() => {
          this.ready.next(true);
        }, 500);
      });
  }

  private getPublicListFromServer(id: string): Observable<ConverterList> {
    return this.httpClient.get(CONVERSIONS_SERVER + '/api/Lists/' + id)
      .pipe(
        map<any, ConverterList>(data => {
          return new ConverterList(data);
        }),
        catchError(err => {
          console.log(err);
          return EMPTY;
        }));
  }

  getConverterList(id: string): Observable<ConverterList> {
    let list = this.publicListsMap[id];
    if (list) {
      return new BehaviorSubject(list).asObservable();
    }

    return this.getPublicListFromServer(id);
  }
}
