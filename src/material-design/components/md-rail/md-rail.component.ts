import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from './navigation-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'md-rail',
  styleUrls: [
    './md-rail.component.scss'
  ],
  templateUrl: './md-rail.component.pug'
})
  export class MdRailComponent {

  @Input() navigationItems: Array<NavigationItem>;

  constructor(private router: Router) {}

  isActive(navigationItem: NavigationItem) {
    return navigationItem.routeMatch.test(this.router.url);
  }

  onNavigationItemClicked(navigationItem: NavigationItem) {
    if (!this.isActive(navigationItem)) {
      this.router.navigate(navigationItem.route);
    }
  }

}
