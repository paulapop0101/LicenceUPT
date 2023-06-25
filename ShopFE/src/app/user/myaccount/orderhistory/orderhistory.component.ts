import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { OrderService } from 'src/app/services/order.service';
import { SeeOrderComponent } from '../../dialogs/see-order/see-order.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent {
  orders: Order[]=[];
  ELEMENT_DATA: any[]=[];
  dataSource! : MatTableDataSource<Order>;
  constructor(public orderService: OrderService, public dialog: MatDialog) {
    this.loadCart();
   }

  ngOnInit(): void {}
  displayedColumns: string[] = ['date', 'total', 'paymentType', 'edit'];

  private loadCart(){
    this.ELEMENT_DATA = [];
    let t = new User();
    if(localStorage.getItem('user')!=null){
      t = JSON.parse( localStorage.getItem('user')!);
    this.orderService.getOrders(t.id).subscribe(
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
