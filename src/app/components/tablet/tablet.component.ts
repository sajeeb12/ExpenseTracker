import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../interface/expenseTracker.interface';
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablet.component.html',
  styleUrl: './tablet.component.scss'
})
export class TabletComponent {
  filter$: Observable<Filter>;

  constructor(private filterService: ExpanseTrackerService) {
    this.filter$ = this.filterService.filter$;
  }

  clearField(field: keyof Filter) {
    this.filterService.removeFilterField(field);
  }
}
