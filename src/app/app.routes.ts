import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
     { path: '', component: LayoutsComponent },
     { path:'card', component:CardComponent}
];
