import { Component, OnInit } from '@angular/core';
import { ConverterList } from '../../models/converter-list';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'public-lists',
  styleUrls: [
    './public-lists.component.scss'
  ],
  templateUrl: './public-lists.component.pug'
})
export class PublicListsComponent implements OnInit {

  public lists: Array<ConverterList> = [];

  private ready: boolean;

  constructor(private listsService: ListsService) {}

  public ngOnInit() {
    this.listsService.ready$.subscribe(value => {
      if (value) {
        this.init();
      }
    });
  }

  init(): void {
    this.lists = this.listsService.publicLists;

    this.ready = true;
  }

}
