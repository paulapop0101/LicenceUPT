import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/Models/cart';
import { CartEntry } from 'src/app/Models/cart-entry';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartCount : number = 0;
  cart : Cart = new Cart();
  ELEMENT_DATA: any[]=[];
  dataSource! : MatTableDataSource<CartEntry>;
  constructor(public cartService:CartService, public dialog: MatDialog) {
    this.cart.entries = [];
    this.loadCart();
   }

  ngOnInit(): void {}
  displayedColumns: string[] = ['name', 'price', 'quantity', 'subtotal','delete'];

  private loadCart(){
    this.ELEMENT_DATA = [];
    let t = new User();
    if(localStorage.getItem('user')!=null){
      t = JSON.parse( localStorage.getItem('user')!);
    this.cartService.getUserCart(t.email).subscribe(
      data=>{
        this.cart=data;
        let entries = this.cart.entries;
        this.cartService.getItemsCount(t.email).subscribe(data=>this.cartCount=data)
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

  changeQuantity(number : number,quantity:number,varid:number, entryid:number){
    
      if(number==1 && quantity<10){
        let entry = new CartEntry();
        entry.quantity=1;
        entry.variant_id=varid;
        let t = new User();
    if(localStorage.getItem('user')!=null){
      t = JSON.parse( localStorage.getItem('user')!);
        this.cartService.addToCart(entry,t.email).subscribe(
          data=>{
            console.log(data);
            this.loadCart();
          }
        )
    }
      }
      else if(number==-1 && quantity > 1){
        this.cartService.decreaseItemQuantity(entryid).subscribe(
          data=>{
            console.log(data);
            this.loadCart();
          }
        )
      }
    

  }

  removeItem(entry_id:number){
    this.cartService.deleteCartEntry(entry_id).subscribe(
      data=>{
          this.loadCart();
      }
    )
  }

  // openDialog(entry : CartEntry) {

  //   const dialogRef =this.dialog.open(ItemEditComponent, {
  //     minWidth: '200px',
  //     width:'500px',
  //     height:'500px',
    
  //     data: entry
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  
  // }
}
