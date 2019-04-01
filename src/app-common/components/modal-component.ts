import { EventEmitter } from '@angular/core';

export interface ModalComponent {
  data: any;
  result: EventEmitter<any>;
}
