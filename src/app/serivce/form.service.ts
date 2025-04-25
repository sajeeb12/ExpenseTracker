import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Filter } from "../interface/expenseTracker.interface";

@Injectable({
    providedIn:"root"
})

export class FormService{
    private formDataSubject = new BehaviorSubject<Filter | null>(null)
    formData$ = this.formDataSubject.asObservable()

    updateFilter(partial:Partial<Filter>){
        const currentFilter = this.formDataSubject.value
        this.formDataSubject.next({...currentFilter,...partial})
    }
    getForm():Filter | null {
        return this.formDataSubject.getValue()
    }

    // resetForm():{
    //     return this.formDataSubject
    // }
   
}