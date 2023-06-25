import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { Cart } from 'src/app/Models/cart';
import { Order } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  dAddress: Address = new Address(); 
  bAddress: Address = new Address();
  userId!:number;
  cart : Cart = new Cart();
  payment: string="";
  constructor(public userService: UserService, public cartService: CartService, public orderService: OrderService, public router: Router){
    this.getAddresses();
    console.log(this.dAddress)
    this.getCart()
  }
  getCart(){
    if(localStorage.getItem('user')){
      let t = new User();
      t = JSON.parse( localStorage.getItem('user')!);
      this.userId=t.id;
      if(t.role==='normal_user'){
        this.cartService.getUserCart(t.email).subscribe(
          data=>this.cart=data,
        )
      }
    }
  }
  getAddresses(){
    if(localStorage.getItem('user')){
      let t = new User();
      t = JSON.parse( localStorage.getItem('user')!);
      this.userId=t.id;
      if(t.role==='normal_user'){
        this.userService.getBAddress(t.id).subscribe(data=>this.bAddress = data)
        this.userService.getDAddress(t.id).subscribe(data=>{
          this.dAddress = data;
          console.log(this.dAddress)
        })
      }
    }
  }
  addBAdd(){
    this.userService.addBAddressToUser(this.bAddress,this.userId).subscribe(data=>console.log(data))
  }
  addDAdd(){
    this.userService.addDAddressToUser(this.dAddress,this.userId).subscribe(data=>console.log(data))
  }
  placeOrder(){
    let order = new Order();
    order.user_id = this.userId;
    order.cart_id = this.cart.id;
    order.delivery_address = this.dAddress.id;
    order.invoice_address = this.bAddress.id;
    order.payment = this.payment;
    this.orderService.createOrder(order).subscribe(
      data=>{
        console.log(data);
        this.router.navigateByUrl("");
      }
    )
  }
}
