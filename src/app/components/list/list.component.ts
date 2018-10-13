import { Component, Input, OnInit } from '@angular/core';
import { ConverterList } from '../../models/converter-list';
import { UnitsService } from '../../services/units.service';
import { Converter } from '../../models/converter';
import { Router } from '@angular/router';
import { SimpleConverterList } from '../../models/simple-converter-list';
import { SimpleConverter } from '../../models/simple-converter';

@Component({
  selector: 'list',
  styleUrls: [
    './list.component.scss'
  ],
  templateUrl: './list.component.pug'
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
