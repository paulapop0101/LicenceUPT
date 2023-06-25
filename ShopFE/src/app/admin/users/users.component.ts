import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  ELEMENT_DATA: any[]=[];
  entries: User[] = [];
  dataSource! : MatTableDataSource<User>;
  loaded:boolean = false;
  constructor(public userService: UserService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.loadCart();
  }
  displayedColumns: string[] = ['email','firstname', 'lastname','phone', 'total'];

  private loadCart(){
    this.ELEMENT_DATA = [];
    this.userService.getUsers().subscribe(
      data=>{
        this.entries = data;
        for (let index = 0; index < data.length; index++) {

          this.userService.getTotalOrdersByUser(this.entries[index].id).subscribe(data1=>{

            this.ELEMENT_DATA.push(
              {
                id: this.entries[index].id,
                firstname: this.entries[index].firstname,
                lastname: this.entries[index].lastname ,
                email: this.entries[index].email ,
                phone: this.entries[index].phone,
                orders: data1,
              });
          })

        }
        // for (let index = 0; index < data.length; index++) {
        //   console.log(this.entries[index].id)
        //   this.userService.getTotalOrdersByUser(this.entries[index].id).subscribe(data1=>{
        //     console.log(data1);
        //     this.ELEMENT_DATA.push(
        //       {
        //         id: this.entries[index].id,
        //         firstname: this.entries[index].firstname,
        //         lastname: this.entries[index].lastname ,
        //         email: this.entries[index].email ,
        //         phone: this.entries[index].phone,
        //         orders: data1,
        //       });
        //   })

        // }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

       this.loaded = true;
      }
    )
   }
}
