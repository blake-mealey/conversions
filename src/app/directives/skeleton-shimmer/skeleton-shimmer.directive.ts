import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[skeletonShimmer]'
})
export class SkeletonShimmerDirective {

  constructor(private element: ElementRef,
              private renderer: Renderer2) {

    let overlay = this.renderer.createElement('shimmer-overlay');
    this.setStyles(overlay, {
      position: 'absolute',
      padding: 'inherit',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      zIndex: '20',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0)) no-repeat -100% 0',
      backgroundSize: '50%',
      animation: 'skeleton-shimmer 1.5s infinite'
    });

    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.element.nativeElement, overlay);

  }

  private setStyles(element: any, stylesMap: { [name: string]: string }): void {
    for (let style in stylesMap) {
      this.renderer.setStyle(element, style, stylesMap[style]);
    }
  }

}
