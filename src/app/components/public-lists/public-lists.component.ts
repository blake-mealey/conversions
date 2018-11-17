import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'public-lists',
  styleUrls: [
    './public-lists.component.scss'
  ],
  templateUrl: './public-lists.component.pug'
})
export class PublicListsComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions: Array<Subscription>;

  private loading: boolean;

  @ViewChild('list') listElement: ElementRef;

  constructor(private listsService: ListsService) {
    this.subscriptions = [];
  }

  public ngOnInit() {
    this.subscriptions.push(this.listsService.loading$.subscribe(loading => this.loading = loading));
    this.listsService.loadNextPage();
  }

  public ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
