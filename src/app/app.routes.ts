import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
     { path: '', component: LayoutsComponent },
];
