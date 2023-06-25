import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { Subcategory } from 'src/app/Models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editbaseproduct',
  templateUrl: './editbaseproduct.component.html',
  styleUrls: ['./editbaseproduct.component.scss']
})
export class EditbaseproductComponent {
  product: Baseproducts = new Baseproducts();
  error: string ="";
  subcategories : Subcategory[] = [];
  constructor( public dialogRef: MatDialogRef<EditbaseproductComponent>,@Inject(MAT_DIALOG_DATA) public cat: Baseproducts, public productService: ProductService, public categoryService:CategoryService) {
    this.product.id = cat.id;
    this.product.name = cat.name;
    this.product.subcategory = cat.subcategory;
    this.product.description = cat.description;
    categoryService.getSubcategories().subscribe(
      data=> this.subcategories = data
    )
  }

  isValid(){
    if(this.product.name === this.cat.name && this.product.subcategoryId === this.cat.subcategoryId && this.product.description === this.cat.description)
      this.error = "Nothing changed";
    if(this.product.name ==="" || this.product.description ==="")
      this.error = "Fields can not be null";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.productService.updateProduct(this.product).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
