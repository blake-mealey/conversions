import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../logic/conversion';
import { UserInputService } from '../../../app-common/services/user-input.service';
import { UnitsService } from '../../services/units.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ListsService } from '../../services/lists.service';
import { ConverterList } from '../../models/converter-list';
import { EMPTY, Observable } from 'rxjs';
import { ConversionOutput } from '../../logic/conversion-output';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';
import { Routes } from '../../routes';

@Component({
  selector: 'converter-list',
  styleUrls: [
    './converter-list.component.scss'
  ],
  templateUrl: './converter-list.component.pug'
})
export class ConverterListComponent extends SubscriberComponent implements OnInit {

  public readonly navigationItems = Routes.All;

  public conversions: Array<Conversion> = [];
  public converterList$: Observable<ConverterList>;

  private ready: boolean;

  constructor(private userInputService: UserInputService,
              private unitsService: UnitsService,
              private listsService: ListsService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.unitsService.ready$.subscribe(value => {
      if (value) {
        this.init();
      }
    }));
  }

  public init(): void {
    this.converterList$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        if (id) {
          return this.listsService.getConverterList(params.get('id'));
        } else {
          this.ready = true;
          return EMPTY;
        }
      })
    );

    this.subscriptions.push(this.converterList$.subscribe(list => {
      this.ready = true;

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
    }));

    this.subscriptions.push(this.userInputService.registerHotkey('a', () => this.onAddClicked()));
  }

  public onAddClicked() {
    this.conversions.push(new Conversion(this.unitsService.unitTypes[0]));
  }

  public onClosed(conversion: Conversion) {
    const index = this.conversions.indexOf(conversion);
    if (index > -1) {
      this.conversions.splice(index, 1);
    }
  }
}
