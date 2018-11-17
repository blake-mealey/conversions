import { Renderer2 } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, style } from '@angular/animations';

export class MdRipple {
  private static RIPPLE_DURATION_MS = 300;
  private static FADE_OUT_DURATION_MS = 300;
  private static RIPPLE_OPACITY = 0.1;

  private rippleElement: any;

  constructor(private renderer: Renderer2,
              private animationBuilder: AnimationBuilder,
              private parentElement: any,
              x: number,
              y: number) {

    let cssPosition = getComputedStyle(this.parentElement).getPropertyValue('position');
    if (!cssPosition || cssPosition == 'static') {
      this.renderer.setStyle(this.parentElement, 'position', 'relative');
    }
    this.renderer.setStyle(this.parentElement, 'overflow', 'hidden');

    this.rippleElement = this.renderer.createElement('md-ripple');
    this.setStyles(this.rippleElement, {
      position: 'absolute',
      borderRadius: '9999px',
      zIndex: '10',
      backgroundColor: '#000000',
      opacity: MdRipple.RIPPLE_OPACITY,
      pointerEvents: 'none'
    });

    const rippleSize = Math.ceil(2 * Math.sqrt(
      this.parentElement.offsetWidth*this.parentElement.offsetWidth +
      this.parentElement.offsetHeight*this.parentElement.offsetHeight));
    const factory = this.animationBuilder.build(this.rippleIn(x, y, rippleSize));
    const player = factory.create(this.rippleElement);

    this.renderer.appendChild(this.parentElement, this.rippleElement);
    player.play();
  }

  private rippleIn(x: number, y: number, size: number): AnimationMetadata[] {
    let halfSize = size * 0.5;
    return [
      style({
        width: 0,
        height: 0,
        left: `${x}px`,
        top: `${y}px`
      }),
      animate(`${MdRipple.RIPPLE_DURATION_MS}ms ease-in`, style({
        width: size,
        height: size,
        left: `${x - halfSize}px`,
        top: `${y - halfSize}px`
      }))
    ];
  }

  private fadeOut(): AnimationMetadata[] {
    return [
      style({
        opacity: MdRipple.RIPPLE_OPACITY
      }),
      animate(`${MdRipple.FADE_OUT_DURATION_MS}ms ease-in`, style({
        opacity: 0
      }))
    ];
  }

  private setStyles(element: any, stylesMap: { [name: string]: any }): void {
    for (let style in stylesMap) {
      this.renderer.setStyle(element, style, stylesMap[style]);
    }
  }

  public destroy(): void {
    const factory = this.animationBuilder.build(this.fadeOut());
    const player = factory.create(this.rippleElement);
    player.play();
    setTimeout(() => {
      this.renderer.removeChild(this.parentElement, this.rippleElement);
    }, MdRipple.FADE_OUT_DURATION_MS);
  }
}
