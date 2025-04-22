import { Component, ElementRef, HostListener, Input, signal } from '@angular/core';
import { dropdownData } from '../../../interface/expenseTracker.interface';
import { FormControl } from '@angular/forms';
import { RadioButtonComponent } from "../radio-button/radio-button.component";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RadioButtonComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent <T = unknown> {
  isDropdownOpen = signal(false)
  @Input() items:T[] =[]
  // @Input() labelFn!: (item: T) => string;
  @Input() labelFn!:(item: T) => string;
  @Input() valueFn!:(item: T) => string | number
  @Input() control!:FormControl
  selectedItem : T | null = null
  selectItem(item:T){
    this.selectedItem = item
    this.isDropdownOpen.set(false)
  }
  constructor(private eRef: ElementRef) {}

@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.isDropdownOpen.set(false)
  }
}
}
