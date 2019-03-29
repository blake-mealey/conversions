import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Routes } from '../../routes';

export const ROOT_SELECTOR = 'app';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.pug'
})
export class AppComponent implements OnInit {

  public readonly navigationItems = Routes.All;

  constructor(private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitsService.init();
  }

}
