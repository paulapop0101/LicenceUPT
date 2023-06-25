import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  content: number = 0;
  constructor(public router: Router) {}
  logout(){
    localStorage.removeItem('user');
   this.router.navigate(['']);
 }
  showContent(index: number){
      this.content = index;
  }
}
