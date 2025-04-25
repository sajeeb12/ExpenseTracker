import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionFormComponent } from "./components/transaction-form/transaction-form.component";
import { CashFlowComponent } from "./components/cash-flow/cash-flow.component";
import { ExpanseTrackerService } from './serivce/expanse-tracker.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { transaction } from './interface/expenseTracker.interface';
import { DropdownComponent } from "./shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionFormComponent, CashFlowComponent, DropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'expenseTracker';
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
