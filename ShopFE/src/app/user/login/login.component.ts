import { compileNgModule } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() changeForm = new EventEmitter<string>();

  goToRegister() {
    this.changeForm.emit();
  }
  validateLogin(){
    if(this.user.email!=="" && this.user.password !=="")
        this.onSubmit()
  }
  constructor(public router: Router,public userService: UserService) { }

  user : User = new User();

  ngOnInit(): void {
  }
  response : String = "";
  onSubmit(){
    this.response = "";

    this.userService.logUser(this.user).subscribe(data=>
      {console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        if(data.role=='admin')
          this.router.navigate(['admin']);
        else this.router.navigate(['home']);
      },
      error=>{
        console.log(error);
        this.response=error.error;
      });

  }
}
