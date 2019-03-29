import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriberComponent implements OnDestroy{
  protected readonly subscriptions: Array<Subscription>;

  constructor() {
    this.subscriptions = [];
  }

  protected addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
