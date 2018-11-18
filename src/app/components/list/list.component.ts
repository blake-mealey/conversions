import { Component, Input, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Router } from '@angular/router';
import { SimpleConverterList } from '../../models/simple-converter-list';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { slideIn, slideOut } from '../../../app-common/animations';

@Component({
  selector: 'list',
  styleUrls: [
    './list.component.scss'
  ],
  templateUrl: './list.component.pug',
  animations: [
    trigger('slideIn', [
      state('open', style({})),

      transition(':enter', [
        useAnimation(slideIn)
      ]),

      transition(':leave', [
        useAnimation(slideOut)
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  @Input() list: SimpleConverterList;

  constructor(private unitsService: UnitsService,
              private router: Router) {}

  public ngOnInit() {}

  onClicked() {
    this.router.navigate(['/lists', this.list.id]);
  }
}
