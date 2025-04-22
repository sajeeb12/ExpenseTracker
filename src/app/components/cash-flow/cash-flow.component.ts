import { Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../utils/app.const';
import { Filter, transaction } from '../../interface/expenseTracker.interface';
import { DatePipe, JsonPipe } from '@angular/common';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { TabletComponent } from "../tablet/tablet.component";

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, JsonPipe, TabletComponent],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.scss'
})
export class CashFlowComponent implements OnInit{

  private expenseTrackerService = inject(ExpanseTrackerService)
  
  categories = Category
  @Input() transactionList:transaction[] = []

  

  filterForm = new FormGroup({
    category:new FormControl(''),
    date:new FormControl('')
  })

  get categoryControl():FormControl{
    return this.filterForm.get('category') as FormControl
  }

  get dateControl():FormControl{
    return this.filterForm.get('date') as FormControl
  }

  ngOnInit():void{
    this.filterForm.get('category')?.valueChanges.subscribe({
      next: (category) => {
        console.log("Selected Category", category)
        this.expenseTrackerService.selectedCategory(category as string)
      }
    })
    this.filterForm.get('date')?.valueChanges.subscribe({
      next: (date) => {
        console.log("Selected Category", date)
        this.expenseTrackerService.selectedDate(date as string)
      }
    })

    this.filterForm.valueChanges.subscribe({
      next: (filterValue) => {
        this.expenseTrackerService.updateFilter(filterValue as Partial<Filter>)
      }
    })
    
  }

  resetFilter(){
    this.filterForm.reset({
      category:''
    })
    const filteredList = this.transactionList.slice(-1,-1+5)
    console.log("FilterList", filteredList)
  }
  
}
