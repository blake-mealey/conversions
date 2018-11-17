import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'md-backdrop-component',
  styleUrls: [
    './md-backdrop.component.scss'
  ],
  templateUrl: './md-backdrop.component.pug',
  animations: [
    trigger('simpleFadeAnimation', [
      state('open', style({
        opacity: 1,
      })),
      state('void', style({
        opacity: 0.5,
        transform: 'perspective(1000px) rotateX(45deg)'
      })),
      transition('void => *', [
        animate('0.3s ease')
      ])
    ])
  ]
})
export class MdBackdropComponent implements OnInit {

  @Input() header: string;

  constructor() {}

  public ngOnInit() {}

}
