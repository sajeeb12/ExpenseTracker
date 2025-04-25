import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CashFlowComponent } from "../cash-flow/cash-flow.component";
import { TransactionFormComponent } from "../transaction-form/transaction-form.component";
import { ExpanseTrackerService } from '../../serivce/expanse-tracker.service';
import { transaction } from '../../interface/expenseTracker.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CashFlowComponent, TransactionFormComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  private expenseTrackerService = inject(ExpanseTrackerService)
    private destroyRef = inject(DestroyRef)
    totalIncome = signal(250)
    totalExpense = signal(180)
    transactionList = signal<transaction[]>([])
  
    filteredList = computed(() => this.transactionList().slice(-5))
  
    balance = computed(()=> this.totalIncome() - this.totalExpense())
    ngOnInit(): void {
        this.expenseTrackerService.getTransactionList()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next:(transaction) => {
            this.transactionList.set(transaction)
            console.log("Transaction List",this.transactionList())
            // console.log("Expense",this.transactionList().filter(x => x.type === 'Expense'))
            this.totalExpense.set(this.transactionList()
            .filter(expense => expense.type === 'Expense').reduce((sum,t)=> sum + t.amount,0))
            this.totalIncome.set(this.transactionList()
            .filter(income => income.type === 'Income').reduce ((sum,t)=> sum + t.amount, 0))
            
          }
        })
    }
}
