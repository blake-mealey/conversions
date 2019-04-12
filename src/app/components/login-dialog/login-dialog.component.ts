import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../app-common/components/modal-component';
import { IdentityProvider } from '../../models/identity-provider';
import { ModalService } from '../../../app-common/services/modal.service';
import { Observable } from 'rxjs';

export type LoginModalData = {
  identityProviders: Observable<IdentityProvider[]>;
}

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.pug'
})
export class LoginDialogComponent implements ModalComponent {
  @Input() public data: LoginModalData;

  @Output() public result: EventEmitter<IdentityProvider>;

  constructor(private modalService: ModalService) {
    this.result = new EventEmitter<IdentityProvider>()
  }

}
