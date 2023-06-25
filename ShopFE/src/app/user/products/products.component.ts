import { NumberInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/Models/attribute';
import { Filter } from 'src/app/Models/filter';
import { Filters } from 'src/app/Models/filters';
import { VariantModel } from 'src/app/Models/products/variantModel';
import { AttributeService } from 'src/app/services/attribute.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  subcategoryId: string | null = '';
  attributes: Attribute[] = [];
  products: VariantModel[] =[];
  hprice: NumberInput = 300;
  lprice: NumberInput = 0;
  filterMap: Map<number,number[]> = new Map();
  word: string = "";
  constructor(public router: Router, public attributeService: AttributeService,private route: ActivatedRoute, public productService: ProductService){
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.subcategoryId = params.get('id');
      attributeService.getAttributesBySub(Number(this.subcategoryId)).subscribe(
        data=> {
          console.log(data),
          this.attributes=data,
          this.attributes.forEach(att =>{
            this.filterMap.set(att.id,[])
          })
        }
      )
      productService.getVariantsBySubcategory(Number(this.subcategoryId)).subscribe(
        data=>{
          this.products = data
          console.log(data);
        }
      )
    });
    // attributeService.getHPrice().subscribe(
    //   data=> this.hprice = data,
    // )
  }
  submit(){
    if(this.word!=="" ) {
      let obj : Filters = new Filters();
      obj.lprice = this.lprice;
      obj.hprice = this.hprice;
      obj.attributes = [];
      console.log(obj,this.lprice, this.hprice)
      this.productService.getFilteredAndWord(obj,Number(this.subcategoryId),this.word).subscribe(data=>{
        this.products = data;
      })
    }
    else{
      this.applyFilters();
    }
  }
  add(checked: any, attid:number, valueid: number){
    console.log(checked,attid,valueid)
    if(checked)
      this.filterMap.get(attid)?.push(valueid)
    else{
      let list = this.filterMap.get(attid);
      this.filterMap.set(attid,list!.filter(value => value !== valueid))
    }
    console.log(this.filterMap)
  }
  applyFilters(){
    let filters : Filter[] = [];
    this.filterMap.forEach((values,att)=>{
     if(values.length>0)
     filters.push({
      attributeId: att,
      valueIds: values
    })
    })
    let obj : Filters = new Filters();
    obj.lprice = this.lprice;
    obj.hprice = this.hprice;
    obj.attributes = filters;
    console.log(obj,this.lprice, this.hprice)
    this.productService.getFiltered(obj,Number(this.subcategoryId)).subscribe(data=>{
      this.products = data;
    })
  }
  deleteFilters(){
    this.lprice = 0 ;
    this.hprice = 300;
    this.attributeService.getAttributesBySub(Number(this.subcategoryId)).subscribe(
      data=> {
        console.log(data),
        this.attributes=data,
        this.attributes.forEach(att =>{
          this.filterMap.set(att.id,[])
        })
      }
    )
    this.productService.getVariantsBySubcategory(Number(this.subcategoryId)).subscribe(
      data=>{
        this.products = data
        console.log(data);
      }
    )
  }

}
