import { Component, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../app-common/components/modal-component';
import { ModalService } from '../../../app-common/services/modal.service';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.pug'
})
export class ErrorDialogComponent implements ModalComponent {
  public data: any;
  public result: EventEmitter<any>;

  constructor(private modalService: ModalService) {
    this.result = new EventEmitter<any>();
  }
}
