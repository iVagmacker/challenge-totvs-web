import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { NewCostumersComponent } from './new-costumers/new-costumers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'new', component: NewCostumersComponent },
  { path: 'edit/:id', component: NewCostumersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }