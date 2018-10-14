import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MdRipple } from './md-ripple';
import { AnimationBuilder } from '@angular/animations';

@Directive({
  selector: '[mdRipple]'
})
export class MdRippleDirective {

  private ripple: MdRipple;

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private animationBuilder: AnimationBuilder) {
  }

  @HostListener('mousedown', ['$event', '$event.target', '$event.offsetX', '$event.offsetY']) onMouseDown(event, target, x, y) {
    console.log(event);
    this.onMouseUp();

    while (target && target != this.element.nativeElement && !isNaN(target.offsetLeft) && !isNaN(target.offsetTop)) {
      x += target.offsetLeft - target.scrollLeft;
      y += target.offsetTop - target.scrollTop;
      target = target.offsetParent;
    }

    this.ripple = new MdRipple(this.renderer, this.animationBuilder, this.element.nativeElement, x, y);
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.ripple) {
      this.ripple.destroy();
      this.ripple = null;
    }
  }

}
