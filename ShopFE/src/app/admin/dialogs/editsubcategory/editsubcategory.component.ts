import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { Subcategory } from 'src/app/Models/subcategory';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.scss']
})
export class EditsubcategoryComponent {
  category: string = "";
  error: string ="";
  constructor( public dialogRef: MatDialogRef<EditcategoryComponent>,@Inject(MAT_DIALOG_DATA) public cat: Subcategory, public categoryService : CategoryService) {
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
    this.isValid() && this.categoryService.editSubcategory(this.category, this.cat.id).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
