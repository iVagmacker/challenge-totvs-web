import { Injectable } from '@angular/core';
import { CustomerModel } from '../../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CostumerMapUtilService {
  constructor() { }

  public assignFormattedPhoneNumbers(customer: CustomerModel): void {
    const formattedNumbers: Array<string> = customer.phones.map(phone => this.formatPhoneNumber(phone.number));
    customer.phonesNumbers = formattedNumbers.join(', ');
  }

  public formatPhoneNumber(phoneNumber: number): string {
    const formattedNumber = `(${phoneNumber.toString().slice(0, 2)}) ${phoneNumber.toString().slice(2, 7)}-${phoneNumber.toString().slice(7)}`;
    return formattedNumber;
  }

}
