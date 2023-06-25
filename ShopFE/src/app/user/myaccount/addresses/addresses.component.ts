import { Component } from '@angular/core';
import { Address } from 'src/app/Models/address';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {
  dAddress: Address = new Address(); 
  bAddress: Address = new Address();
  userId!:number;
  constructor(public userService: UserService){
    this.getAddresses();
    console.log(this.dAddress)
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
}

