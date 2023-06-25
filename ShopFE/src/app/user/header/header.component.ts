import { ThisReceiver } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { Subcategory } from 'src/app/Models/subcategory';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  topVal: number  = 1.1;
  topValue: string = this.topVal+"em";
  showCate: boolean = false;
  showSubcat: boolean = false;
  categories: Category[] = [];
  isLoggedIn: boolean;
  subcategories: Subcategory[] = [];
  items: number = -1;
  @Input() itemsCount:number = 0;
  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  } 
  constructor(public cartService:CartService,public router:Router, public categoryService: CategoryService) { 
    let t : User;
    categoryService.getCategories().subscribe(
      data=> this.categories = data
    )
    if(localStorage.getItem('user')){
      let t = new User();
      t = JSON.parse( localStorage.getItem('user')!);
      if(t.role==='normal_user'){
        this.isLoggedIn=true;
        cartService.getItemsCount(t.email).subscribe(data=>this.itemsCount=data)
      }
      else this.isLoggedIn=false;
    }
    else{
      this.isLoggedIn=false;
    }
  }
  // calculateItemsCount(){
  //   let t = new User();
  //     if(localStorage.getItem('user')){
  //     t = JSON.parse( localStorage.getItem('user')!);
  //     if(t.role==='normal_user'){
  //       this.isLoggedIn=true;
  //       this.cartService.getItemsCount(t.email).subscribe(data=>{
  //         this.items=data;
  //       },error=>this.items=-1)
  //     }
  //     else{
  //     this.items = -1;
  //     }
  //   }
  //   else this.items= -1;
  // }
  // getItemsCount(){
  //   this.calculateItemsCount();
  //   let number=0;
  //   if(this.items>=0){
  //     number=this.items
  //   }
  //   if(this.itemsCount!==undefined){
  //     number=this.itemsCount;
  //   }
  //   return number;
  // }

  showSubcategories(pozition: number, subcate: Subcategory[]){
    this.showSubcat = true;
    this.topVal= 1.1 + pozition*2;
    this.topValue = this.topVal + "em";
    this.subcategories = subcate;
  }
  hideCategories() {
    this.showCate = false;
  }
  showCategories(){
    this.showCate = true;
  }
}
