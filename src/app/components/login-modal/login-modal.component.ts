import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal-outlet/modal-component';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../services/modal.service';

export type LoginModalData = {
  identityProviders: IdentityProvider[];
}

@Component({
  selector: 'login-modal',
  styleUrls: [
    './login-modal.component.scss'
  ],
  templateUrl: './login-modal.component.pug'
})
export class LoginModalComponent implements ModalComponent {
  @Input() public data: LoginModalData;

  @Output() public result: EventEmitter<IdentityProvider>;

  constructor(private modalService: ModalService) {
    this.result = new EventEmitter<IdentityProvider>()
  }

  public onCancelClicked() {
    this.modalService.closeModal();
  }

}
