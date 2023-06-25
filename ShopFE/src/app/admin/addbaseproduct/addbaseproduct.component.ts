import { Component } from '@angular/core';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { Subcategory } from 'src/app/Models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addbaseproduct',
  templateUrl: './addbaseproduct.component.html',
  styleUrls: ['./addbaseproduct.component.scss']
})
export class AddbaseproductComponent {
    product : Baseproducts = new Baseproducts();
    error: string = "";
    subcategories : Subcategory[] = [];
    constructor(public productService: ProductService, public subcategoryService: CategoryService){
        subcategoryService.getSubcategories().subscribe(
          data=> this.subcategories = data
        )
    }

    isValid(){
      if(this.product.name === "" || this.product.description === "" || this.product.subcategoryId=== undefined)
        this.error = "All fields are mandatory"
      return this.error === "" ? true : false;
    }

    addProduct(){
      this.error = "";
      this.isValid() && this.productService.addProduct(this.product).subscribe(
        data=> window.alert("Added succesfully"),
        error=>{
          this.error = error.error;
        }
      )
    }
}
