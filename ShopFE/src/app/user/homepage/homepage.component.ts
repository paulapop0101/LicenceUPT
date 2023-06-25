import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { Subcategory } from 'src/app/Models/subcategory';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  categories: Subcategory[] = [];
  urlMap: Map<number,String> = new Map()
  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  } 
  constructor(public cartService:CartService,public router:Router, public categoryService: CategoryService) { 
    categoryService.getSubcategories().subscribe(
      data=> {
        this.categories = data;
        this.categories.forEach(cat=>{
          categoryService.getUrl(cat.id).subscribe(
            data1=>{
                this.urlMap.set(cat.id,data1);
                console.log(this.urlMap)
            }
          )
        })
      }
    )
  }
}
