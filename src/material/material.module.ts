import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextFieldComponent } from './components/text-field/text-field.component';
import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { MenuComponent } from './components/menu/menu.component';
import { IconButtonMenuComponent } from './components/icon-button-menu/icon-button-menu.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TextFieldComponent,
    FloatingActionButtonComponent,
    IconButtonComponent,
    MenuComponent,
    IconButtonMenuComponent,
    AppBarComponent,
    SideBarComponent
  ],
  exports: [
    TextFieldComponent,
    FloatingActionButtonComponent,
    IconButtonComponent,
    MenuComponent,
    IconButtonMenuComponent,
    AppBarComponent,
    SideBarComponent
  ]
})
export class MaterialModule {}
