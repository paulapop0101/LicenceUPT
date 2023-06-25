import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/Models/cart';
import { CartEntry } from 'src/app/Models/cart-entry';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-see-order',
  templateUrl: './see-order.component.html',
  styleUrls: ['./see-order.component.scss']
})
export class SeeOrderComponent {
  cartCount : number = 0;
  cart : Cart = new Cart();
  ELEMENT_DATA: any[]=[];
  dataSource! : MatTableDataSource<CartEntry>;
  constructor(public cartService:CartService,@Inject(MAT_DIALOG_DATA) public cart_id: number) {
    this.loadCart();
   }

  ngOnInit(): void {}
  displayedColumns: string[] = ['name', 'price', 'quantity', 'subtotal'];

  private loadCart(){
    this.ELEMENT_DATA = [];
    this.cartService.getCart(this.cart_id).subscribe(
      data=>{
        console.log("cart",data)
        this.cart=data;
        let entries = this.cart.entries;
        for (let index = 0; index < entries.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: entries[index].id,
              variant: entries[index].variant,
              name: entries[index].name ,
              quantity: entries[index].quantity,
              price :entries[index].price,
              url :entries[index].url,
              totalPrice: entries[index].totalPrice
            });

        }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    )
   }
}
