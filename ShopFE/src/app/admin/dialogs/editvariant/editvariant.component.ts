import { Attribute } from 'src/app/Models/attribute';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariantModel } from 'src/app/Models/products/variantModel';
import { AttributeService } from 'src/app/services/attribute.service';
import { ProductService } from 'src/app/services/product.service';
import { Value } from 'src/app/Models/value';

@Component({
  selector: 'app-editvariant',
  templateUrl: './editvariant.component.html',
  styleUrls: ['./editvariant.component.scss']
})
export class EditvariantComponent {
  product: VariantModel = new VariantModel();
  error: string ="";
  attributes: Attribute[] = [];
  selection: Map<number,boolean> = new Map();
  name: string = '';
  initialValues: number[] = [];
  constructor( public dialogRef: MatDialogRef<EditvariantComponent>,@Inject(MAT_DIALOG_DATA) public cat: any, public productService: ProductService, public attributeService: AttributeService) {
    this.product.quantity = cat.quantity;
    this.product.price = cat.price;
    this.product.picture = cat.imageSRC;
    this.product.attributes = [];
    this.product.newpicture = false;
    console.log(cat);
    this.productService.getAssignedValues(this.cat.productId).subscribe(
      data=>{
  
        this.attributes=data;
        // this.attributes.forEach(element => {
        //       element.values.forEach(el => {
        //           this.selection.set(el.id,true);
        //  });
        // });
        console.log(cat.assignedValues);
        this.cat.assignedValues.forEach((val : any)=>{
          this.product.attributes.push(val.id);
          this.selection.set(val.value.id,false);
        })
        this.initialValues = this.product.attributes;
        console.log(this.selection);
      }
  
    )
  }
  // getAssignedValues(){
  //   this.productService.getAssignedValues(this.cat.productId).subscribe(
  //     data=>{
  
  //       this.attributes=data;
  //       this.attributes.forEach(element => {
  //             element.values.forEach(el => {
  //                 this.selection.set(el,false);
  //        });
  //       });
  //       this.cat.assignedValues.forEach(val=>{
  //         this.selection.set(val.value,true);
  //       })
  //     }
  
  //   )
  // }
  isValid(){
    if(this.product.quantity === this.cat.quantity && this.product.price === this.cat.price && this.product.picture === this.cat.imageSRC 
      && this.product.attributes === this.initialValues)
      this.error = "Nothing changed";
    if(this.product.quantity === null || this.product.price === null)
      this.error = "Fields can not be null";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.productService.updateVariant(this.product,this.cat.id).subscribe(data=>{
          this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
  disablegr(group: Attribute, value : Value, data: any) {
    console.log(data.selected)
    if(data.selected){
    group.values.forEach(val=>{
      this.selection.set(val.id,true)
    })
    this.selection.set(value.id,false)
    }
    else{
      group.values.forEach(val=>{
        this.selection.set(val.id,false)
      })
    }
  }
  handleUpload(event: any) {
    const file = event.target.files[0];
    this.name = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.product.picture = reader.result;
        this.product.newpicture = true;
    };
  }
}
