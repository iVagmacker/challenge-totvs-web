import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoNotificationService, PoPageListComponent, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { CustomersService } from './customers.service';
import { CustomerModel } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CostumerMapUtilService } from '../../shared/utils/costumer-map.util';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  @ViewChild('poPageList', { static: true }) poPageList!: PoPageListComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  public customers: CustomerModel[] = [];
  public customer!: CustomerModel;
  public fields: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'address', label: 'Endereço' },
    { property: 'district', label: 'Bairro' },
    { property: 'phonesNumbers', label: 'Lista de telefones' },
  ];

  public actions: Array<PoTableAction> = [
    { action: this.viewDetailsCustomer.bind(this), icon: 'po-icon-info', label: 'Visualizar' },
    { action: this.editCustomer.bind(this), icon: 'po-icon po-icon-edit', label: 'Editar' }
  ];

  constructor(private readonly customersService: CustomersService, private readonly notificationService: PoNotificationService, private router: Router, private utils: CostumerMapUtilService) { }

  ngOnInit(): void {
    this.getCostumers();
  }

  private getCostumers() {
    this.customersService.findAll().subscribe({
      next: (data: CustomerModel[]) => this.mapCustomers(data),
      error: (err) => this.notificationService.error(err)
    })
  }

  private mapCustomers(item: CustomerModel[]): void {
    this.customers = item;
    this.customers.forEach(customer => this.utils.assignFormattedPhoneNumbers(customer));
  }

  public addCostumer() {
    this.router.navigateByUrl('/customers/new');
  }

  private editCustomer(item: CustomerModel) {
    this.router.navigateByUrl(`/customers/edit/${item.id}`);
  }

  public deleteItems(event: CustomerModel[] | undefined) {
    if (event) {
      const item = this.customers.find(customer => !event.includes(customer));
      if (item) {
        this.customersService.delete(item.id).subscribe();
      }
    }
  }

  private viewDetailsCustomer(item: CustomerModel) {
    this.customer = item;
    this.poModal.open();
  }
}

