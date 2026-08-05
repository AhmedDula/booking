

import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {

    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-8');
    this.renderer.addClass(this.el.nativeElement, 'transition-all');
    this.renderer.addClass(this.el.nativeElement, 'duration-700');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {

          this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          this.renderer.removeClass(this.el.nativeElement, 'translate-y-8');

          this.renderer.addClass(this.el.nativeElement, 'opacity-100');
          this.renderer.addClass(this.el.nativeElement, 'translate-y-0');

          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.el.nativeElement);
  }
}
