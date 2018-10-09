import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdTextFieldComponent } from './components/md-text-field/md-text-field.component';
import { MdFloatingActionButtonComponent } from './components/md-floating-action-button/md-floating-action-button.component';
import { MdRaisedButtonComponent } from './components/md-raised-button/md-raised-button.component';
import { MdIconButtonComponent } from './components/md-icon-button/md-icon-button.component';
import { MdMenuComponent } from './components/md-menu/md-menu.component';
import { MdRaisedButtonMenuComponent } from './components/md-raised-button-menu/md-raised-button-menu.component';
import { MdIconButtonMenuComponent } from './components/md-icon-button-menu/md-icon-button-menu.component';
import { MdAppBarComponent } from './components/md-app-bar/md-app-bar.component';
import { MdRailComponent } from './components/md-rail/md-rail.component';
import { MdBackdropComponent } from './components/md-backdrop/md-backdrop.component';
import { MdChipComponent } from './components/md-chip/md-chip.component';

import { UserInputService } from './services/user-input.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    MdTextFieldComponent,
    MdFloatingActionButtonComponent,
    MdRaisedButtonComponent,
    MdIconButtonComponent,
    MdMenuComponent,
    MdRaisedButtonMenuComponent,
    MdIconButtonMenuComponent,
    MdAppBarComponent,
    MdRailComponent,
    MdBackdropComponent,
    MdChipComponent
  ],
  exports: [
    MdTextFieldComponent,
    MdFloatingActionButtonComponent,
    MdRaisedButtonComponent,
    MdIconButtonComponent,
    MdMenuComponent,
    MdRaisedButtonMenuComponent,
    MdIconButtonMenuComponent,
    MdAppBarComponent,
    MdRailComponent,
    MdBackdropComponent,
    MdChipComponent
  ],
  providers: [
    UserInputService
  ]
})
export class MaterialDesignModule {}
