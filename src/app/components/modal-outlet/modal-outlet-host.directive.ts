import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalOutletHost]'
})
export class ModalOutletHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
