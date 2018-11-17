import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInputService } from './services/user-input.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    UserInputService
  ]
})
export class AppCommonModule {}
