import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef, Input,
} from '@angular/core';

@Component({
  selector: 'text-field',
  styleUrls: [
    './text-field.component.scss'
  ],
  templateUrl: './text-field.component.pug'
})
export class TextFieldComponent implements AfterContentInit {

  focused: boolean;
  filled: boolean;

  @Input() label: string;

  @ContentChild('input') input: ElementRef;

  constructor() {}

  ngAfterContentInit(): void {
    if (!this.input) { return; }

    this.input.nativeElement.addEventListener('focus', () => {
      this.focused = true;
    });

    this.input.nativeElement.addEventListener('blur', () => {
      this.focused = false;
    });

    this.input.nativeElement.addEventListener('input', () => {
      this.updateFilled();
    });

    setTimeout(() => {
      this.updateFilled();
    }, 5);
  }

  updateFilled(): void {
    this.filled = this.input.nativeElement.value;
  }

}
