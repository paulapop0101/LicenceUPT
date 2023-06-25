import { Component, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Attribute } from 'src/app/Models/attribute';
import { CartEntry } from 'src/app/Models/cart-entry';
import { VariantModel } from 'src/app/Models/products/variantModel';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  quant: number = 1;
  variant_id!: number;
  variant: VariantModel = new VariantModel();
  attributes: Attribute[] = [];
  varMap: Map<string,{id:Number,show:boolean}> = new Map();
  selectedF: string = "";
  selectedS: string = "";
  error: string="";
  itemsCount!: number;
  constructor(public cartService:CartService,public productService: ProductService,public router: Router, public route: ActivatedRoute){
    this.route.paramMap.subscribe((params) => {
      this.variant_id = Number(params.get('id'));
      productService.getVariant(this.variant_id).subscribe(
        data=>{
          this.variant = data
          productService.getPDPAttributes(this.variant.productId).subscribe(
            data=>{
              this.attributes = data;
              this.attributes.forEach(att=>{
                att.values.forEach(val=>{this.varMap.set(val.value,{id:0,show:false})})
              })
              this.attributes.forEach(att=>{
                productService.getByFirstAttribute(this.variant.productId,att.id).subscribe(
                  data=>{
                    data.forEach((el:{id:Number,value:string})=>{
                      this.varMap.set(el.value,{id : el.id,show:true})
                    })
                  }
                )
              })
            }
          )
        }
      );
      
    })
    
  }
  increase(){
    if(this.quant<this.variant.quantity){
      this.quant++;
    }
  }
  decrease(){
    if(this.quant > 1){
      this.quant--;
    }
  }
  getNextAtt(index:number,valuee:string){
    if(index===0){
      this.selectedS = "";
      this.selectedF = valuee;
      this.productService.getVariant(this.varMap.get(valuee)!.id).subscribe(
        data=>this.variant = data
      )
      this.productService.getBySecondAttribute(this.variant.productId,this.attributes[0].id,this.attributes[1].id,valuee).subscribe(
        data=>{
          this.attributes[1].values.forEach(value=>{
            this.varMap.set(value.value,{id:0,show:false})
          })
          data.forEach((el:{id:Number,value:string})=>{
            this.varMap.set(el.value,{id:el.id,show:true})
          })
        }
      )
    }
    if(index===1){
      this.selectedS = valuee;
      this.productService.getVariant(this.varMap.get(valuee)!.id).subscribe(
        data=>{
          this.variant = data
          console.log(this.variant.id)
        }
      )
    }
  }
  addToCart(){
    if(this.selectedF!==""&&this.selectedS!==""){
      let entry = new CartEntry();
      entry.quantity=this.quant;
      entry.variant_id=this.variant.id;
      
      let t = new User();
      if(localStorage.getItem('user')!=null){
        t = JSON.parse( localStorage.getItem('user')!);
          this.cartService.addToCart(entry,t.email).subscribe(
            data=>{
              console.log(data);
              let t = new User();
              if(localStorage.getItem('user')!=null){
                t = JSON.parse( localStorage.getItem('user')!);
                this.cartService.getItemsCount(t.email).subscribe(data=>this.itemsCount=data)
              }
            }
          )
      }
    }
    else{
      this.error="Please choose";
    }
  }
}
