import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../utils/app.const';
import { OnlyNumericDirective } from '../../../shared/directive/only-numeric.directive';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { category, transaction } from '../../interface/expenseTracker.interface';
import { JsonPipe } from '@angular/common';
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { CashFlowComponent } from "../cash-flow/cash-flow.component";
import { DropdownComponent } from "../../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [OnlyNumericDirective, ReactiveFormsModule, JsonPipe, CashFlowComponent, DropdownComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit {

    private expenseTrackerService = inject(ExpanseTrackerService)
    categories = Category
    labelCategory = (c:category) => c.catName
    valueCategory = (v:category) => v.catName

    transactionForm = new FormGroup({
      // id:new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
      amount: new FormControl(0),
      category: new FormControl(''),
      date: new FormControl('')
    })

    get categoryControl():FormControl{
      return this.transactionForm.get('category') as FormControl
    }
    ngOnInit(): void {
      console.log("Category", this.categories)
    }

    addTransaction() {
      const transactionFormObject = JSON.stringify(this.transactionForm.value)
      console.log("Form Valuex:",transactionFormObject)
      this.expenseTrackerService.postTransaction(this.transactionForm.value)
      .subscribe({
        next: (value) => {
          console.log("Posted",value)
        }
      })
      this.transactionForm.reset({
        type:'',
        category:'',
        amount:0
      })
      console.log("Form Value:",this.transactionForm.value)
    }

}
