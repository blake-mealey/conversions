import { Component, Input } from '@angular/core';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';
import { slideIn } from '../../../app-common/animations';
import { NavigationItem } from '../md-rail/navigation-item';
import { Router } from '@angular/router';

const slideParams = {
  duration: '0.3s ease',
  translateY: '100px'
};

@Component({
  selector: 'md-backdrop',
  styleUrls: [
    './md-backdrop.component.scss'
  ],
  templateUrl: './md-backdrop.component.pug',
  animations: [
    trigger('slideIn', [
      state('open', style({})),
      transition(':enter', [
        useAnimation(slideIn, {params: slideParams})
      ])
    ])
  ]
})
export class MdBackdropComponent {

  @Input() navigationItems: Array<NavigationItem>;

  @Input() title: string;
  @Input() subtitle: string;

  menuOpen: boolean;

  constructor(private router: Router) {}

  onMenuButtonClicked(): void {
    this.menuOpen = !this.menuOpen;
  }

}
