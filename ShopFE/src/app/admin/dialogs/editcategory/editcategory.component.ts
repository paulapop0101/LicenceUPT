import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/Models/category';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent {
  category: string = "";
  error: string ="";
  constructor( public dialogRef: MatDialogRef<EditcategoryComponent>,@Inject(MAT_DIALOG_DATA) public cat: Category, public categoryService : CategoryService) {
    this.category = cat.name;
  }

  isValid(){
    if(this.category == this.cat.name)
      this.error = "The name is the same";
    if(this.category =="")
      this.error = "Field can not be null";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.categoryService.editCategory(this.category, this.cat.id).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
