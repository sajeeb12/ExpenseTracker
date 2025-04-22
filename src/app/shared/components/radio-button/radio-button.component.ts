import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
type Value = string | number

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  @Input() value!: Value;
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() name!: string;

  @Output() valueChange: EventEmitter<Value> = new EventEmitter<Value>();

  // onSelectionChange() {
  //   this.valueChange.emit(this.value);
  // }
}
