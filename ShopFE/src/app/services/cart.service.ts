import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntry } from '../Models/cart-entry';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   t : User=new User();
  constructor(public http : HttpClient) {
    this.t = JSON.parse( localStorage.getItem('user')!);
   }

  addToCart(entry : CartEntry, email:string): Observable<any>{
    return this.http.post("http://localhost:8080/api/addCartEntry/"+email,entry);
  }
  getItemsCount(email:string):Observable<any>{
    return this.http.get("http://localhost:8080/api/getItemsCount/"+email);
  }

  getUserCart(email:string):Observable<any>{
    return this.http.get("http://localhost:8080/api/getUserCart/"+email)
  } 
  getCart(id:number):Observable<any>{
    return this.http.get("http://localhost:8080/api/getCartById/"+id)
  } 
  decreaseItemQuantity(id:number):Observable<any>{
    return this.http.delete("http://localhost:8080/api/decreaseItemQuantity/"+id);
  }
  deleteCartEntry(id:number):Observable<any>{
    return this.http.delete("http://localhost:8080/api/deleteCartEntry/"+id)
  }
}
