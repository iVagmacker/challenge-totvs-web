import { Component, OnInit, ViewChild } from "@angular/core";
import { PoDynamicFormComponent, PoDynamicFormField, PoNotificationService } from "@po-ui/ng-components";
import { CustomerModel } from "../../../models/customer.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from "../customers.service";

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-costumers.component.html',
  styleUrl: './new-costumers.component.scss'
})
export class NewCostumersComponent implements OnInit {
  @ViewChild('dynamicForm', { static: true }) form!: PoDynamicFormComponent;

  public customer!: CustomerModel;
  public validateFields: Array<string> = ['state'];
  public readonly fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      required: true,
      minLength: 10,
      errorMessage: 'Deve conter no mínimo 10 letras',
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      placeholder: 'Digite seu nome completo...',
      noAutocomplete: true
    },
    {
      property: 'address',
      label: 'Endereço',
      gridColumns: 6,
      gridSmColumns: 12,
      placeholder: 'Digite seu endereço...',
      noAutocomplete: true
    },
    { property: 'district', label: 'Bairro', gridColumns: 6, gridSmColumns: 12, placeholder: 'Digite seu bairro...', noAutocomplete: true },
    { property: 'phonesNumbers', label: 'Telefone(s)', gridColumns: 6, mask: '(99) 99999-9999', gridSmColumns: 12, placeholder: 'Digite o número do seu telefone...' },
  ];

  constructor(private route: ActivatedRoute, private customersService: CustomersService, private notificationService: PoNotificationService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.findCustomerById(params['id']);
      }
    })
  }

  private findCustomerById(id: number) {
    this.customersService.findById(id).subscribe({
      next: (data) => this.mapCustomer(data),
      error: (err) => this.notificationService.error(err.error.message)
    });
  }

  private mapCustomer(item: CustomerModel): void {
    this.customer = item;
    this.customer.phonesNumbers = this.customer.phones.map(phone => phone.number).join(', ');
  }

  public save() {
    const form = this.form.form.value;
    const customer = new CustomerModel();
    customer.address = form.address;
    customer.name = form.name;
    customer.district = form.district;
    customer.phones = [form.phonesNumbers];
    if (!this.customer) {
      this.customersService.create(customer).subscribe({
        next: (data) => {
          this.notificationService.success(`Cliente ${data.name} cadastrado com sucesso`);
          this.router.navigateByUrl("/customers");
          this.form.form.reset();
        },
        error: (err) => this.notificationService.error(err.error.message)
      })
    } else {
      console.log(customer)
      customer.id = this.customer.id;
      this.customersService.update(customer).subscribe({
        next: (data) => {
          this.notificationService.success(`Cliente ${data.name} alterado com sucesso`);
          this.router.navigateByUrl("/customers");
          this.form.form.reset();
        },
        error: (err) => this.notificationService.error(err.error.message)
      })
    }
  }

  public formIsValid(): boolean {
    return false;
  }
}
