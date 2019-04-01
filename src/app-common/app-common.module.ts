import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalOutletComponent } from './components/modal-outlet/modal-outlet.component';

import { ModalOutletHostDirective } from './components/modal-outlet/modal-outlet-host.directive';

import { UserInputService } from './services/user-input.service';
import { ModalService } from './services/modal.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    // Components
    ModalOutletComponent,

    // Directives
    ModalOutletHostDirective
  ],
  exports: [
    ModalOutletComponent
  ],
  providers: [
    UserInputService,
    ModalService
  ]
})
export class AppCommonModule {}
