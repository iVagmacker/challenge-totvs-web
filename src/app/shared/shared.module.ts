import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoCheckboxModule, PoFieldModule, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableModule, PoDynamicModule, PoButtonModule, PoDividerModule, PoInfoModule } from '@po-ui/ng-components';
import { PoPageDynamicTableModule  } from '@po-ui/ng-templates';
import { CostumerMapUtilService } from './utils/costumer-map.util';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoModalModule,
    PoMenuModule,
    PoPageModule,
    PoCheckboxModule,
    PoFieldModule,
    PoTableModule,
    PoPageDynamicTableModule,
    PoDynamicModule,
    PoButtonModule,
    PoDividerModule,
    PoInfoModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoModalModule,
    PoMenuModule,
    PoPageModule,
    PoCheckboxModule,
    PoFieldModule,
    PoToolbarModule,
    PoTableModule,
    PoPageDynamicTableModule,
    PoDynamicModule,
    PoButtonModule,
    PoDividerModule,
    PoInfoModule
  ],
  providers: [CostumerMapUtilService]
})
export class SharedModule { }