import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from '../material-design/material-design.module';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './components/app/app.component';
import { ConverterListComponent } from './components/converter-list/converter-list.component';
import { ConverterComponent } from './components/converter/converter.component';
import { SkeletonConverterComponent } from './components/skeleton-converter/skeleton-converter.component';
import { SkeletonListComponent } from './components/skeleton-list/skeleton-list.component';
import { PublicListsComponent } from './components/public-lists/public-lists.component';
import { ListComponent } from './components/list/list.component';

import { SkeletonShimmerDirective } from './directives/skeleton-shimmer/skeleton-shimmer.directive';

import { ApiService } from './services/api.service';
import { UnitsService } from './services/units.service';
import { ListsService } from './services/lists.service';

/*
 * Load styles root
 */
import '../styles/styles.scss';

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
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    // My modules
    MaterialDesignModule
  ],
  declarations: [
    // Components
    AppComponent,
    ConverterListComponent,
    ConverterComponent,
    SkeletonConverterComponent,
    SkeletonListComponent,
    PublicListsComponent,
    ListComponent,

    // Directives
    SkeletonShimmerDirective
  ],
  providers: [
    environment.ENV_PROVIDERS,

    ApiService,
    UnitsService,
    ListsService,

    APP_PROVIDERS
  ]
})
export class AppModule {}
