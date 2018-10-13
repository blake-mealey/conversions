import { Component, OnInit } from '@angular/core';
import { ConverterList } from '../../models/converter-list';
import { ListsService } from '../../services/lists.service';
import { SimpleConverterList } from '../../models/simple-converter-list';

@Component({
  selector: 'public-lists',
  styleUrls: [
    './public-lists.component.scss'
  ],
  templateUrl: './public-lists.component.pug'
})
export class PublicListsComponent implements OnInit {

  private ready: boolean;
  private lists: Array<SimpleConverterList>;

  constructor(private listsService: ListsService) {}

  public ngOnInit() {
    this.listsService.getConverterLists()
      .subscribe(lists => {
        this.lists = lists;
        this.ready = true;
      });
  }

}
