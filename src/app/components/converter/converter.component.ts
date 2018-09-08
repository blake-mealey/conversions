import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversion } from '../../models/conversion';

@Component({
  selector: 'converter',
  styleUrls: [
    './converter.component.scss'
  ],
  templateUrl: './converter.component.pug'
})
export class ConverterComponent implements OnInit {

  @Input() conversion: Conversion;
  @Output() closed = new EventEmitter<Conversion>();

  constructor() {}

  public ngOnInit() {}

  public onCloseClicked() {
    this.closed.emit(this.conversion);
  }
}
