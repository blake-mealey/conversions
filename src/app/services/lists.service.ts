import { Injectable } from '@angular/core';
import { ConverterList } from '../models/converter-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ApiService } from './api.service';
import { SimpleConverterList } from '../models/simple-converter-list';

@Injectable()
export class ListsService {
  // public publicLists: Array<ConverterList> = [];
  // public publicListsMap: { [ listId: string ]: ConverterList } = {};
  //
  // private ready = new BehaviorSubject(false);
  // public ready$ = this.ready.asObservable();

  constructor(private apiService: ApiService) {}

  // private addPublicList(list: ConverterList) {
  //   let index = this.publicLists.findIndex(l => l.id == list.id);
  //   if (index) {
  //     this.publicLists[index] = list;
  //   } else {
  //     this.publicLists.push(list);
  //   }
  //   this.publicListsMap[list.id] = list;
  // }
  //
  // public init(): void {
  //   this.apiService.getLists(0, 10)
  //     .subscribe(lists => {
  //       for (let list of lists) {
  //         this.addPublicList(list);
  //       }
  //
  //       setTimeout(() => {
  //         this.ready.next(true);
  //       }, 500);
  //     });
  // }

  public getConverterLists(): Observable<Array<SimpleConverterList>> {
    return this.apiService.getLists(0, 10);
  }

  public getConverterList(id: string): Observable<ConverterList> {
    return this.apiService.getList(id);
  }
}
