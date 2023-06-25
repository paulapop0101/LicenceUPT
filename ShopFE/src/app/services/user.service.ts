import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Address } from '../Models/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    let url = "http://localhost:8080/api/getUsers";
    return this.http.get<any>(url);
  }

  addUser(user :Partial<{ firstname: string | null; lastname: string | null; email: string | null; phone: string | null; password: string | null; checkPassword: string | null; }>): Observable<Object>{
    return this.http.post("http://localhost:8080/api/addUser",user);
  }

  logUser(user: User): Observable<any>{
    return this.http.post("http://localhost:8080/api/logUser",user);
  }
  updateUser(userid : number, user :Partial<{ firstname: string | null; lastname: string | null; phone: string | null;} >): Observable<Object>{
    let url = "http://localhost:8080/api/updateUser" + "/" + userid;
    return this.http.put(url,user);
  }
  addDAddressToUser(address: Address, userid: number): Observable<any>{
    let url = "http://localhost:8080/api/addDAddress" + "/" + userid;
    return this.http.post(url,address);
  }
  addBAddressToUser(address: Address, userid: number): Observable<any>{
    let url = "http://localhost:8080/api/addBAddress" + "/" + userid;
    return this.http.post(url,address);
  }
  getDAddress(id: number): Observable<any> {
    let url = "http://localhost:8080/api/getDAddress/"+id;
    return this.http.get<any>(url);
  }
  getBAddress(id: number): Observable<any> {
    let url = "http://localhost:8080/api/getBAddress/"+id;
    return this.http.get<any>(url);
  }
  getUserCount(){
    let url = "http://localhost:8080/api/getUserCount";
    return this.http.get<any>(url);
  }
  getIncome(){
    let url = "http://localhost:8080/api/getIncome";
    return this.http.get<any>(url);
  }
  getIncomeMonths(){
    let url = "http://localhost:8080/api/getIncomeByMonths";
    return this.http.get<any>(url);
  }
  getSales(){
    let url = "http://localhost:8080/api/getSales";
    return this.http.get<any>(url);
  }
  getTotalOrders(){
    let url = "http://localhost:8080/api/getOrders";
    return this.http.get<any>(url);
  }
  getTotalOrdersByMonths(){
    let url = "http://localhost:8080/api/getOrdersByMonths";
    return this.http.get<any>(url);
  }
  getTotalOrdersByUser(id:number){
    let url = "http://localhost:8080/api/getTotalOrders/"+id;
    return this.http.get<any>(url);
  }
}
