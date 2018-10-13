/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { NavigationItem } from '../../../material-design/components/md-rail/navigation-item';

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
export class AppComponent implements OnInit {

  public navigationItems: Array<NavigationItem> = [
    // new NavigationItem('Account', 'person', ['/account'], /^\/account$/),
    new NavigationItem('Conversions', 'compare_arrows', ['/'], /^\/(lists\/[\w\-]{22})?$/),
    new NavigationItem('Lists', 'list', ['/lists'], /^\/lists$/),
    // new NavigationItem('Settings', 'settings', ['/settings'], /^\/settings$/)
  ];

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.init();
  }

}
