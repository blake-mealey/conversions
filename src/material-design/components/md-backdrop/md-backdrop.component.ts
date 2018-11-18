import { Component, Input, OnInit } from '@angular/core';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';
import { slideIn } from '../../../app-common/animations';

const slideParams = {
  duration: '0.3s ease',
  translateY: '100px'
};

@Component({
  selector: 'md-backdrop-component',
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
export class MdBackdropComponent implements OnInit {

  @Input() header: string;

  constructor() {}

  public ngOnInit() {}

}
