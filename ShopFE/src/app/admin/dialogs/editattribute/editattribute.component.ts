import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attribute } from 'src/app/Models/attribute';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-editattribute',
  templateUrl: './editattribute.component.html',
  styleUrls: ['./editattribute.component.scss']
})
export class EditattributeComponent {
  category: Attribute = new Attribute();
  error: string ="";
  constructor( public dialogRef: MatDialogRef<EditattributeComponent>,@Inject(MAT_DIALOG_DATA) public cat: Attribute, public attributeService: AttributeService) {
    this.category.name = cat.name;
    this.category.isOnPDP = this.cat.isOnPDP;
  }

  isValid(){
    if(this.category.name == this.cat.name && this.category.isOnPDP == this.cat.isOnPDP)
      this.error = "Nothing changed";
    if(this.category.name =="")
      this.error = "Field can not be null";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.attributeService.editAttribute(this.category, this.cat.id).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
