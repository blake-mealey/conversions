import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../models/conversion';
import { UserInputService } from '../../../material-design/services/user-input.service';
import { UnitsService } from '../../services/units.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ListsService } from '../../services/lists.service';
import { ConverterList } from '../../models/converter-list';
import { EMPTY, Observable } from 'rxjs';
import { ConversionOutput } from '../../models/conversion-output';

@Component({
  selector: 'converter-list',
  styleUrls: [
    './converter-list.component.scss'
  ],
  templateUrl: './converter-list.component.pug'
})
export class ConverterListComponent implements OnInit{

  public conversions: Array<Conversion> = [];
  public converterList$: Observable<ConverterList>;

  private ready: boolean;

  constructor(private userInputService: UserInputService,
              private unitsService: UnitsService,
              private listsService: ListsService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.unitsService.ready$.subscribe(value => {
      if (value) {
        this.init();
      }
    });
  }
  
  init(): void {
    this.ready = true;

    this.converterList$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        if (id) {
          return this.listsService.getConverterList(params.get('id'));
        } else {
          return EMPTY;
        }
      })
    );

    this.converterList$.subscribe(list => {
      for (let converter of list.converters) {
        let unitType = this.unitsService.getUnitType(converter.unitTypeId);

        let conversion = new Conversion(unitType);

        conversion.input.unit = unitType.getUnit(converter.input.unitSymbol);
        conversion.input.value = converter.input.value;

        conversion.outputs.splice(0, 1);
        for (let outputModel of converter.outputs) {
          let output = new ConversionOutput(conversion);
          output.unit = unitType.getUnit(outputModel.unitSymbol);
          conversion.outputs.push(output);
        }

        this.conversions.push(conversion);
      }
    });

    this.userInputService.registerHotkey('a', () => this.onAddClicked());
  }

  onAddClicked() {
    this.conversions.push(new Conversion(this.unitsService.unitTypes[0]));
  }

  onClosed(conversion: Conversion) {
    let index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
