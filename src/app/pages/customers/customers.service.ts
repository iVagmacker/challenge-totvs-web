import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerModel } from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private url = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  findAll(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.url);
  }

  findById(id: number): Observable<CustomerModel> {
    const url = this.url + `/${id}`;
    return this.http.get<CustomerModel>(url);
  }

  create(dto: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.url, dto);
  }

  update(dto: CustomerModel): Observable<CustomerModel> {
    const url = this.url + `/${dto.id}`;
    return this.http.put<CustomerModel>(url, dto);
  }

  delete(id: number): Observable<void> {
    const url = this.url + `/${id}`;
    return this.http.delete<void>(url);
  }
}