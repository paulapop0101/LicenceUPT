import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subcategory } from 'src/app/Models/subcategory';
import { AttributeService } from 'src/app/services/attribute.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-newsubcat',
  templateUrl: './newsubcat.component.html',
  styleUrls: ['./newsubcat.component.scss']
})
export class NewsubcatComponent {
  selectedId: number = 0;
  subcategories: Subcategory[] = [];
  error: string = "";
  constructor( public dialogRef: MatDialogRef<NewsubcatComponent>,@Inject(MAT_DIALOG_DATA) public id: number,public categoryService: CategoryService, public attributeService: AttributeService){
    categoryService.getSubcategories().subscribe(
      data=> this.subcategories = data
    )
  }
  isValid(){
    if(this.selectedId === 0)
      this.error = "Please select a subcategory";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.attributeService.addSubcategory(this.id, this.selectedId).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
