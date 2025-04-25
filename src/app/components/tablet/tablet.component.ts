import { Component, DestroyRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../interface/expenseTracker.interface';
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { CommonModule } from '@angular/common';
import { FormService } from '../../serivce/form.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tablet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablet.component.html',
  styleUrl: './tablet.component.scss'
})
export class TabletComponent {
  filter$: Observable<Filter>;

  filterForm!:Filter

  constructor(private filterService: ExpanseTrackerService) {
    this.filter$ = this.filterService.filter$;
  }

  private formService = inject(FormService)
  private destroyRef = inject(DestroyRef)

  ngOnInit():void{
    this.filter$.subscribe(value => {
      this.filterForm = value
      console.log("Form Value updated",this.filterForm)
    })

    // this.formService.formData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //   next:(updateFormValue) =>
    //      console.log("New Form Service Update Value",updateFormValue)
    // })
  }
  
 removeKeyValue(key: string) {
    this.filterForm[key as keyof Filter] = '';
  }

  get keysWithValues() {
    return Object.entries(this.filterForm)
      .filter(([_, value]) => value !== '');
  }

  // clearField(field: keyof Filter) {
  //   this.filterService.removeFilterField(field);
  // }
}
