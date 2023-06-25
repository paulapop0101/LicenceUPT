import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  active: boolean = true;
  changeForm(){
    this.active=!this.active;
  }
}
