import { Component, Input, OnInit } from '@angular/core';
import { ConverterList } from '../../models/converter-list';
import { UnitsService } from '../../services/units.service';
import { Converter } from '../../models/converter';
import { Router } from '@angular/router';

@Component({
  selector: 'list',
  styleUrls: [
    './list.component.scss'
  ],
  templateUrl: './list.component.pug'
})
export class ListComponent implements OnInit {

  @Input() list: ConverterList;

  constructor(private unitsService: UnitsService,
              private router: Router) {}

  public ngOnInit() {}

  getUnitTypeName(converter: Converter) {
    return this.unitsService.getUnitType(converter.unitTypeId).displayName;
  }

  getUnitName(converter: Converter, unitSymbol: string) {
    return this.unitsService.getUnitType(converter.unitTypeId).getUnit(unitSymbol).displayName;
  }

  onClicked() {
    this.router.navigate(['/lists', this.list.id]);
  }
}
