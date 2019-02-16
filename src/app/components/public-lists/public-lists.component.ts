import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';

@Component({
  selector: 'public-lists',
  styleUrls: [
    './public-lists.component.scss'
  ],
  templateUrl: './public-lists.component.pug'
})
export class PublicListsComponent extends SubscriberComponent implements OnInit, AfterViewInit {

  private loading: boolean;

  @ViewChild('converter-list-card') listElement: ElementRef;

  constructor(private listsService: ListsService) {
    super();
  }

  public ngOnInit() {
    this.subscriptions.push(this.listsService.loading$.subscribe(loading => this.loading = loading));
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
