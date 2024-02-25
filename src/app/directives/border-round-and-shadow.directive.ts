import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderRoundAndShadow]',
  standalone: true,
})
export class BorderRoundAndShadowDirective {
  @Input() appBorderRoundAndShadow = '';
  @Input() defBorder = '';
  constructor(private domEle: ElementRef) {
    //? only posible way for inital value at begining inside constructor as next line
    // this.domEle.nativeElement.style.borderRadius = '20px';
    //? Note : found that here in constructor can't get value from outside as initial value . have to but it maulaly
    // console.log(this.appBorderRoundAndShadow, '*********');
    // console.log(this.defBorder, '*********');
    // this.domEle.nativeElement.style.borderRadius =
    //   this.appBorderRoundAndShadow || this.defBorder;
  }

  //----------------------------------------------------------------------------------
  //? solution i to call it afterr Dom view created (as event listener)
  ngAfterViewInit() {
    this.initBorderRadius();
    this.flyIn();
  }

  private initBorderRadius = () => {
    this.domEle.nativeElement.style.borderRadius =
      this.appBorderRoundAndShadow || this.defBorder || '20px';
  };
  //----------------------------------------------------------------------------------
  @HostListener('mouseenter') onMouseEnter() {
    // this.initBorderRadius();
    this.addShadow();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.removeShadow();
  }

  private addShadow() {
    this.domEle.nativeElement.style.transform = 'scale(1.02)'; // Zoom
    this.domEle.nativeElement.style.boxShadow =
      '0 15px 30px rgba(0, 0, 255, 0.5)'; // Increased intensity blue shadow
  }

  private removeShadow() {
    this.domEle.nativeElement.style.transform = 'scale(1)'; // Reset zoom
    this.domEle.nativeElement.style.boxShadow = 'none'; // Remove shadow
  }

  private flyIn() {
    this.domEle.nativeElement.style.opacity = '0';
    this.domEle.nativeElement.style.transition = 'opacity 0.5s, transform 0.5s';
    setTimeout(() => {
      this.domEle.nativeElement.style.opacity = '1';
      this.domEle.nativeElement.style.transform = 'translateY(0)';
    }, 100); // Adjust the delay as needed
  }
}
