import { PhoneModel } from "./phone.model";

export class CustomerModel {
  id!: number;
  name!: string;
  district!: string;
  address!: string;
  phones!: PhoneModel[];
  phonesNumbers!: string;
}