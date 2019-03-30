import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AppCommonModule } from '../app-common/app-common.module';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './components/app/app.component';
import { ModalOutletComponent } from './components/modal-outlet/modal-outlet.component';
import { ConverterListComponent } from './components/converter-list/converter-list.component';
import { ConverterCardComponent } from './components/converter-card/converter-card.component';
import { SkeletonConverterCardComponent } from './components/skeleton-converter-card/skeleton-converter-card.component';
import { SkeletonConverterListCardComponent } from './components/skeleton-converter-list-card/skeleton-converter-list-card.component';
import { PublicListsComponent } from './components/public-lists/public-lists.component';
import { ConverterListCardComponent } from './components/converter-list-card/converter-list-card.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

import { LoginModalComponent } from './components/login-modal/login-modal.component';

import { ModalOutletHostDirective } from './components/modal-outlet/modal-outlet-host.directive';
import { SkeletonShimmerDirective } from './directives/skeleton-shimmer/skeleton-shimmer.directive';

import { ModalService } from './services/modal.service';
import { SessionService } from './services/session.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth/auth.service';
import { UnitsService } from './services/units.service';
import { ListsService } from './services/lists.service';

/*
 * Load styles root
 */
import '../styles/styles.scss';
import { CommonModule } from '@angular/common';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    // Angular modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    // My modules
    MaterialDesignModule,
    AppCommonModule
  ],
  declarations: [
    // Components
    AppComponent,
    ModalOutletComponent,
    ConverterListComponent,
    ConverterCardComponent,
    SkeletonConverterCardComponent,
    SkeletonConverterListCardComponent,
    PublicListsComponent,
    ConverterListCardComponent,
    AuthRedirectComponent,
    UserAuthComponent,
    LoginModalComponent,

    // Directives
    ModalOutletHostDirective,
    SkeletonShimmerDirective
  ],
  providers: [
    environment.ENV_PROVIDERS,

    ModalService,
    SessionService,
    ApiService,
    AuthService,
    UnitsService,
    ListsService,

    APP_PROVIDERS
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class AppModule {}
