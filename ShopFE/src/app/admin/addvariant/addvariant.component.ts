import { Portal } from '@angular/cdk/portal';
import { getNsPrefix } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Attribute } from 'src/app/Models/attribute';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { VariantModel } from 'src/app/Models/products/variantModel';
import { Subcategory } from 'src/app/Models/subcategory';
import { Value } from 'src/app/Models/value';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
interface Pokemon {
  value: string;
  viewValue: string;
  disabled?: boolean;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}
@Component({
  selector: 'app-addvariant',
  templateUrl: './addvariant.component.html',
  styleUrls: ['./addvariant.component.scss']
})

export class AddvariantComponent {
  myFile!: File;
  pokemonControl = new FormControl('');
  selection: Map<Value,boolean> = new Map();
  products : Baseproducts[] = [];
  error: string = "";
  subcategories : Subcategory[] = [];
  variant: VariantModel = new VariantModel();
  attributes : Attribute[] = []; 
  productId : number = 0;
  name : string = "";
  constructor(public productService: ProductService, public subcategoryService: CategoryService){
    productService.getProducts().subscribe(
      data=>{
        this.products = data;
      }
    )
  }

  isValid(){
    if(this.variant.product_id === undefined || this.variant.price === undefined 
      || this.variant.quantity === undefined  || this.variant.picture === undefined)
      this.error = "All fields are mandatory"
    return this.error === "" ? true : false;
  }

  addProduct(){
    this.error = "";
    console.log(this.variant,this.isValid());
    this.isValid() && this.productService.addVariant(this.variant).subscribe(
      data=> window.alert("Added succesfully"),
      error=>{
        this.error = error.error;
      }
    )
  }
  getAssignedValues(){
    this.productService.getAssignedValues(this.variant.product_id).subscribe(
      data=>{
  
        this.attributes=data;
        this.attributes.forEach(element => {
              element.values.forEach(el => {
                  this.selection.set(el,false);
         });
        });
      }
  
    )
  }
  
  disablegr(group: Attribute, value : Value, data: any) {
    console.log(data.selected)
    if(data.selected){
    group.values.forEach(val=>{
      this.selection.set(val,true)
    })
    this.selection.set(value,false)
    }
    else{
      group.values.forEach(val=>{
        this.selection.set(val,false)
      })
    }
  }
  handleUpload(event: any) {
    const file = event.target.files[0];
    this.name = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.variant.picture = reader.result;
    };
  }
  
}
