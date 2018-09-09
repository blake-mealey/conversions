import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { SearchMenuComponent } from './components/search-menu/search-menu.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FloatingActionButtonComponent,
    IconButtonComponent,
    TextFieldComponent,
    SearchMenuComponent,
    AppBarComponent,
    SideBarComponent
  ],
  exports: [
    FloatingActionButtonComponent,
    IconButtonComponent,
    TextFieldComponent,
    SearchMenuComponent,
    AppBarComponent,
    SideBarComponent
  ]
})
export class MaterialModule {}
