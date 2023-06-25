import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { OrderService } from 'src/app/services/order.service';
import { SeeOrderComponent } from 'src/app/user/dialogs/see-order/see-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: Order[]=[];
  ELEMENT_DATA: any[]=[];
  dataSource! : MatTableDataSource<Order>;
  constructor(public orderService: OrderService, public dialog: MatDialog) {
    this.loadCart();
   }

  ngOnInit(): void {}
  displayedColumns: string[] = ['date','user', 'total', 'paymentType', 'edit'];

  private loadCart(){
    this.ELEMENT_DATA = [];
    this.orderService.getAllOrders().subscribe(
      data=>{
        this.orders=data;
        console.log(this.orders)
        let entries = this.orders;
        for (let index = 0; index < entries.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: entries[index].id,
              userEmail: entries[index].userEmail,
              order_date: entries[index].order_date ,
              paymentType: entries[index].paymentType,
              totalPrice :entries[index].totalPrice,
              cart_id :entries[index].cart_id
            });

        }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    )
   }

  openDialog(index : number) {

    const dialogRef =this.dialog.open(SeeOrderComponent, {
      minWidth: '200px',
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });

  }
}
