import { Component } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent {
  categories: Category[] = [];
  newCategory: string = "";
  newSubcategory: string = "";
  error: string = "";
  suberror: string = ""
  selectedId: number = 0;
  constructor(public categoryService: CategoryService){
    categoryService.getCategories().subscribe(data=>this.categories=data)
  }
  isValid(){
    if(this.newCategory==="")
      this.error = "All fields are mandatory";
    return this.error==="" ? true: false;
  }
  isValidS(){
    if(this.newSubcategory==="" || this.selectedId === 0)
      this.suberror = "All fields are mandatory";
    return this.suberror==="" ? true: false;
  }
  addCategory(){
    this.error = "";
    this.isValid() && this.categoryService.addCategory(this.newCategory).subscribe(data=>{
      this.categoryService.getCategories().subscribe(data=>this.categories=data)
    },
    error=>{
      this.error = error.error;
    })
  }
  addSubcategory(){
    this.suberror = "";
    console.log(this.newSubcategory,this.selectedId)
    this.isValidS() && this.categoryService.addSubcategory(this.newSubcategory,this.selectedId).subscribe(data=>{

    },
    error=>{
      console.log(error)
      this.suberror = error.error;
    })
  }
}
