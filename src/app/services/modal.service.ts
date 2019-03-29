import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

export type ComponentModel = {componentType: any, data: any}

@Injectable()
export class ModalService {
  private modalComponent: BehaviorSubject<ComponentModel>;
  public modalComponent$: Observable<ComponentModel>;

  private currentSubscriber: Subscriber<ComponentModel>;

  constructor() {
    this.modalComponent = new BehaviorSubject(null);
    this.modalComponent$ = this.modalComponent.asObservable();
  }

  public showModal(componentType: any, data: any = null): Observable<ComponentModel> {
    // Close any existing modal without a result
    this.closeModal();

    // Tell the modal component outlet there is a new modal
    this.modalComponent.next({
      componentType: componentType,
      data: data
    });

    // Return an observable for the new modal
    return new Observable<ComponentModel>((subscriber: Subscriber<ComponentModel>) => {
      this.currentSubscriber = subscriber;
    });
  }

  public closeModal(result: any = null) {
    if (this.currentSubscriber) {
      // Tell the modal component outlet to close the modal
      this.modalComponent.next(null);

      // Let the subscriber to the modal know that the modal closed with whatever result we have
      this.currentSubscriber.next(result);
      this.currentSubscriber.complete();
      this.currentSubscriber = null;
    }
  }
}
