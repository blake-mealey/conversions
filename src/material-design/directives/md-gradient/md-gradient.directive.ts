import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { MdRipple } from './md-ripple';
import { Color } from './color';

@Directive({
  selector: '[mdGradient]'
})
export class MdGradientDirective {

  private observer: MutationObserver;
  private backgroundColor: Color;

  constructor(private element: ElementRef,
              private renderer: Renderer2) {

    setTimeout(() => {
      this.update(null);
    }, 0);

    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => this.update(mutation));
    });

    this.observer.observe(this.element.nativeElement, {
      attributes: true,
      attributeFilter: ['style']
    });
  }

  private update(mutation: MutationRecord): void {
    let cssBackgroundColor = getComputedStyle(this.element.nativeElement)
      .getPropertyValue('background-color');

    let newBackgroundColor = Color.fromCssString(cssBackgroundColor);
    if (!newBackgroundColor || (this.backgroundColor && this.backgroundColor.equals(newBackgroundColor))) {
      return;
    }

    this.backgroundColor = newBackgroundColor;
    let lightenedColor = this.backgroundColor.lighten(0.3);

    this.setStyles(this.element.nativeElement, {
      'background-image': `linear-gradient(16deg, #ff8a00, #da1b60)`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-attachment': 'fixed'
    });
  }

  private setStyles(element: any, stylesMap: { [name: string]: string }): void {
    for (let style in stylesMap) {
      this.renderer.setStyle(element, style, stylesMap[style]);
    }
  }



}
