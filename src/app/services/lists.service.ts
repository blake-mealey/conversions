import { Injectable } from '@angular/core';
import { ConverterList } from '../models/converter-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ApiService } from './api.service';

@Injectable()
export class ListsService {
  public publicLists: Array<ConverterList>;
  public publicListsMap: { [ listId: string ]: ConverterList };

  private ready = new BehaviorSubject(false);
  public ready$ = this.ready.asObservable();

  constructor(private apiService: ApiService) {}

  public init(): void {
    this.apiService.getLists(0, 10)
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

  getConverterList(id: string): Observable<ConverterList> {
    let list = this.publicListsMap[id];
    if (list) {
      return new BehaviorSubject(list).asObservable();
    }

    return this.apiService.getList(id);
  }
}
