import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { MdRipple, MdRippleColor } from './md-ripple';
import { AnimationBuilder } from '@angular/animations';
import { UserInputService } from '../../../app-common/services/user-input.service';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';

@Directive({
  selector: '[mdRipple]'
})
export class MdRippleDirective extends SubscriberComponent {

  @Input('mdRipple') mdRippleColor: string;

  private ripple: MdRipple;

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private animationBuilder: AnimationBuilder,
              private userInputService: UserInputService) {
    super();

    this.subscriptions.push(userInputService.mouseClick$.subscribe(() => {
      this.stopRipple();
    }));

    this.subscriptions.push(userInputService.touchEnd$.subscribe(() => {
      this.stopRipple();
    }));
  }

  private stopRipple(): void {
    if (this.ripple) {
      this.ripple.destroy();
      this.ripple = null;
    }
  }

  private startRipple(x, y): void {
    this.stopRipple();

    let elementPosition = this.element.nativeElement.getBoundingClientRect();
    x -= elementPosition.left;
    y -= elementPosition.top;

    let mdRippleColor = MdRippleColor[this.mdRippleColor || 'Light'];
    this.ripple = new MdRipple(this.renderer, this.animationBuilder, this.element.nativeElement, x, y, mdRippleColor);
  }

  @HostListener('mousedown', ['$event.pageX', '$event.pageY']) onMouseDown(x, y) {
    this.startRipple(x, y);
  }

  @HostListener('touchstart', ['$event.touches[0].pageX', '$event.touches[0].pageY']) onTouchStart(x, y) {
    this.startRipple(x, y);
  }
}
