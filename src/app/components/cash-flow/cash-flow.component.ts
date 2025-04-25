import { Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../utils/app.const';
import { Filter, transaction } from '../../interface/expenseTracker.interface';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { TabletComponent } from "../tablet/tablet.component";
import { FormService } from '../../serivce/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, JsonPipe, TabletComponent,CommonModule],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.scss'
})
export class CashFlowComponent implements OnInit{

  private expenseTrackerService = inject(ExpanseTrackerService)
  private formService = inject(FormService)
  private route = inject(ActivatedRoute)
  
  category: (string | null) =''
  filterForm!:FormGroup

  categories = Category
  @Input() transactionList:transaction[] = []

  tempObject :any = {
    id:'1',
    name:'Sajeeb',
    age: '26',
    degree:'B.Sc',
    xyz:'',
  }

  removeKeyValue(key: any) {
    this.tempObject[key] = '';
  }

  get keysWithValues() {
    return Object.entries(this.tempObject)
      .filter(([_, value]) => value !== '' && value != null)
  }



  

  get categoryControl():FormControl{
    return this.filterForm.get('category') as FormControl
  }

  get dateControl():FormControl{
    return this.filterForm.get('date') as FormControl
  }

  ngOnInit():void{
    this.category = this.route.snapshot.queryParamMap.get('cat') || ''
    console.log("parameter",this.category)
    this.filterForm = new FormGroup({
      category:new FormControl<string | null>(this.category),
      date:new FormControl('')
    })
    this.filterForm.get('category')?.valueChanges.subscribe({
      next: (category:string) => {
        console.log("Selected Category", category)
        this.expenseTrackerService.selectedCategory(category as string)
      }
    })
    this.filterForm.get('date')?.valueChanges.subscribe({
      next: (date:string) => {
        console.log("Selected Category", date)
        this.expenseTrackerService.selectedDate(date as string)
      }
    })
    // this.formService.setForm(this.filterForm.value)
    this.expenseTrackerService.updateFilter(this.filterForm.value)
    this.filterForm.valueChanges.subscribe({
      next: (filterValue:FormGroup) => {
        this.expenseTrackerService.updateFilter(filterValue as Partial<Filter>)
        // this.formService.setForm(filterValue as FormGroup)
      }
    })
    
    
  }

  resetFilter(){
   const currentForm = this.filterForm.reset({
    category:'',
    date:''
   })
   this.formService.updateFilter(currentForm as unknown as Partial<Filter>)
  }

  
  
}
