import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(user_id:number): Observable<any> {
    let url = "http://localhost:8080/api/getOrders/"+user_id;
    return this.http.get<any>(url);
  }
  getAllOrders(): Observable<any> {
    let url = "http://localhost:8080/api/getAllOrders";
    return this.http.get<any>(url);
  }
  
  getOrder(order_id:number): Observable<any> {
    let url = "http://localhost:8080/api/getOrders/"+order_id;
    return this.http.get<any>(url);
  }

  createOrder(order :Partial<{ user_id: number | null; cart_id: number | null; payment: string | null; delivery_address: number | null; invoice_address: number | null; }>): Observable<Object>{
    return this.http.post("http://localhost:8080/api/createOrder",order);
  }
}
