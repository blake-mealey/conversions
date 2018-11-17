import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriberComponent implements OnDestroy{
  protected readonly subscriptions: Array<Subscription>;

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
