/**
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.pug'
})
export class AppComponent {

  constructor() {}

}
