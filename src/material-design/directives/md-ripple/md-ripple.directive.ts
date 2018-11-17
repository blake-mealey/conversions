import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MdRipple } from './md-ripple';
import { AnimationBuilder } from '@angular/animations';
import { UserInputService } from '../../../app-common/services/user-input.service';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';

@Directive({
  selector: '[mdRipple]'
})
export class MdRippleDirective extends SubscriberComponent {

  private ripple: MdRipple;

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private animationBuilder: AnimationBuilder,
              private userInputService: UserInputService) {
    super();

    this.subscriptions.push(userInputService.mouseClick$.subscribe(() => {
      this.onMouseUp();
    }));
  }

  @HostListener('mousedown', ['$event.target', '$event.offsetX', '$event.offsetY']) onMouseDown(target, x, y) {
    this.onMouseUp();

    while (target && target != this.element.nativeElement && !isNaN(target.offsetLeft) && !isNaN(target.offsetTop)) {
      x += target.offsetLeft - target.scrollLeft;
      y += target.offsetTop - target.scrollTop;
      target = target.offsetParent;
    }

    this.ripple = new MdRipple(this.renderer, this.animationBuilder, this.element.nativeElement, x, y);
  }

  onMouseUp(): void {
    if (this.ripple) {
      this.ripple.destroy();
      this.ripple = null;
    }
  }
}
