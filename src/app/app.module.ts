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
import { ConvertersContainerComponent } from './components/converters-container/converters-container.component';
import { ConverterComponent } from './components/converter/converter.component';

import { UnitsService } from './services/units.service';

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
    ConvertersContainerComponent,
    ConverterComponent
  ],
  providers: [
    environment.ENV_PROVIDERS,

    UnitsService,

    APP_PROVIDERS
  ]
})
export class AppModule {}
