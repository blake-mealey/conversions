import { Injectable } from '@angular/core';
import { ConverterList } from '../models/converter-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ApiService } from './api.service';
import { SimpleConverterList } from '../models/simple-converter-list';

@Injectable()
export class ListsService {
  private static readonly PAGE_SIZE: number = 10;
  private static readonly PAGE_REQUEST_THROTTLE_DELAY: number = 1000;

  private nextPageIndex: number = 0;

  private loading = new BehaviorSubject(false);
  public loading$ = this.loading.asObservable();

  public publicLists: Array<SimpleConverterList> = [];
  public publicListsMap: { [ id: string ]: boolean } = {};

  constructor(private apiService: ApiService) {}

  private addPublicList(list: SimpleConverterList): void {
    if (this.publicListsMap[list.id]) return;

    this.publicListsMap[list.id] = true;
    this.publicLists.push(list);
  }

  public getConverterLists(): Observable<Array<SimpleConverterList>> {
    return this.apiService.getLists(0, 10);
  }

  public loadNextPage(): void {
    // You cannot start loading the next page if a load is already in progress
    if (this.loading.getValue()) return;

    // Start loading the next page
    this.loading.next(true);

    this.apiService.getLists(this.nextPageIndex, ListsService.PAGE_SIZE)
      .subscribe(lists => {
        // Append new lists to master list
        for (let list of lists) {
          this.addPublicList(list);
        }

        // If this page is finished, get ready to load the next page
        if (lists.length == ListsService.PAGE_SIZE) {
          this.nextPageIndex++;
        }

        // Allow loading the next page again after the timeout
        setTimeout(() => {
          this.loading.next(false);
        }, ListsService.PAGE_REQUEST_THROTTLE_DELAY);
      });
  }

  public getConverterList(id: string): Observable<ConverterList> {
    return this.apiService.getList(id);
  }
}
