import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { NewCostumersComponent } from './new-costumers/new-costumers.component';

@NgModule({
  declarations: [
    CustomersComponent,
    NewCostumersComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
