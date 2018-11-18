import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';
import { NavigationItem } from './navigation-item';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DEFAULT_DURATION } from '../../../app-common/animations';

@Component({
  selector: 'md-rail',
  styleUrls: [
    './md-rail.component.scss'
  ],
  templateUrl: './md-rail.component.pug',
  animations: [
    trigger('stateTransitions', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(5px)'
      })),
      state('hover', style({
        opacity: 0.6
      })),
      state('active', style({
        opacity: 1
      })),

      transition('* => *', [
        animate(DEFAULT_DURATION)
      ])
    ])
  ]
})
export class MdRailComponent implements AfterViewInit {

  @Input() navigationItems: Array<NavigationItem>;

  @ViewChildren('item') itemViews: QueryList<ElementRef>;

  hoveredNavigationItem: NavigationItem;

  constructor(private router: Router) {}

  isActive(navigationItem: NavigationItem) {
    return navigationItem.routeMatch.test(this.router.url);
  }

  onNavigationItemClicked(navigationItem: NavigationItem) {
    if (!this.isActive(navigationItem)) {
      this.router.navigate(navigationItem.route);
    }
  }

  getTitleState(navigationItem: NavigationItem) {
    if (this.isActive(navigationItem)) {
      return 'active';
    } else if (this.hoveredNavigationItem == navigationItem) {
      return 'hover';
    }
    return 'void';
  }

  ngAfterViewInit(): void {
    if (!this.itemViews) { return; }

    this.itemViews.forEach((viewElement, i) => {
      let itemViewElement = viewElement.nativeElement;

      itemViewElement.addEventListener('mouseenter', () => {
        this.hoveredNavigationItem = this.navigationItems[i];
      });

      itemViewElement.addEventListener('mouseleave', () => {
        this.hoveredNavigationItem = null;
      });
    });
  }
}
