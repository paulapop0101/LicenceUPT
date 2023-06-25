import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() changeForm = new EventEmitter<string>();

  goToLogin() {
    this.changeForm.emit();
  }
  validateRegister(){
    console.log("registerd");
    this.onSubmit()
  }
  user: User = new User() ;
  constructor(private userService:UserService) { }

  ngOnInit(): void{}
  message = "";
  success="";
  onSubmit() {
    this.message = "";
    this.success="";
    this.userService.addUser(this.user).subscribe(data=>
      {console.log(data);
        this.success="New account created successfully";
        this.user= new User();
      },
      error=>{
        console.log(error);
        this.message=error.error;
      });

}
}
