import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FloatingActionButtonComponent,
    IconButtonComponent,
    TextFieldComponent
  ],
  exports: [
    FloatingActionButtonComponent,
    IconButtonComponent,
    TextFieldComponent
  ]
})
export class MaterialModule {}
