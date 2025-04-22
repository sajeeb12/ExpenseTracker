import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumeric]',
  standalone: true
})
export class OnlyNumericDirective {

  @Input('appOnlyNumeric') allowNumber = true
  @HostListener('keypress',['Event'])
  OnkeyPress(event:KeyboardEvent){
    if(!this.allowNumber)  return;
    const key = event.key
    if(!/^\d$/.test(key)){
      event.preventDefault()
    }
  }

  constructor() { }

}
