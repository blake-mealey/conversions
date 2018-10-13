import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { SimpleConverterList } from '../../models/simple-converter-list';

@Component({
  selector: 'public-lists',
  styleUrls: [
    './public-lists.component.scss'
  ],
  templateUrl: './public-lists.component.pug'
})
export class PublicListsComponent implements OnInit, AfterViewInit {

  private loading: boolean;
  private lists: Array<SimpleConverterList>;

  @ViewChild('list') listElement: ElementRef;

  constructor(private listsService: ListsService) {}

  public ngOnInit() {
    this.lists = this.listsService.publicLists;
    this.listsService.loading$.subscribe(loading => this.loading = loading);
    this.listsService.loadNextPage();
  }

  ngAfterViewInit(): void {
    if (!this.listElement) { return; }

    let scrollContainer = this.listElement.nativeElement.parentNode;

    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop == (scrollContainer.scrollHeight - scrollContainer.offsetHeight)) {
        this.listsService.loadNextPage();
      }
    });
  }

}
