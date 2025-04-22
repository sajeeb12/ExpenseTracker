import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { Filter, transaction } from '../interface/expenseTracker.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpanseTrackerService {

  private categorySubject = new BehaviorSubject<string>('')
  category$ = this.categorySubject.asObservable()

  private dateSubject = new BehaviorSubject<string>('')
  date$ = this.dateSubject.asObservable()

  private filterSubject = new BehaviorSubject<Filter>({
    category:'',
    date:''
  })

  filter$ = this.filterSubject.asObservable()

  private http = inject(HttpClient)

  private transactionListApiUrl =
        "https://68025c940a99cb7408e965a1.mockapi.io/expenseTracker/transactionList"


  selectedCategory(category:string){
    this.categorySubject.next(category)
  }

  selectedDate(date:string){
    this.dateSubject.next(date)
  }

  updateFilter(partial:Partial<Filter>){
    const currentFilter = this.filterSubject.value
    this.filterSubject.next({...currentFilter,...partial})
  }

  removeFilterField(field: keyof Filter) {
    const current = this.filterSubject.value;
    const updated = { ...current, [field]: '' };
    this.filterSubject.next(updated);
  }

  resetFilters() {
    this.filterSubject.next({ category: '', date: '' });
  }

  // getTransactionList():Observable<transaction[]>{
  //   return this.category$.pipe(
  //     switchMap((category) => 
  //       this.http.get<transaction[]>(`${this.transactionListApiUrl}/?category=${category}`)
  //   )
  //   ) 
  // }

  getTransactionList():Observable<transaction[]>{
    return this.filter$.pipe(
      switchMap((filter)=>{
        let params = new HttpParams()
        Object.entries(filter).forEach(([key,value])=>{
          if (value) params = params.set(key,value)
        });
        return this.http.get<transaction[]>(this.transactionListApiUrl, {params})
      })
    )
  }

  postTransaction(body:any):Observable<transaction>{
    return this.http.post<transaction>(this.transactionListApiUrl,body)
  }
}
