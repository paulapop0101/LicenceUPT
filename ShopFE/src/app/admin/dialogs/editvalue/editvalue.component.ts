import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Value } from 'src/app/Models/value';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-editvalue',
  templateUrl: './editvalue.component.html',
  styleUrls: ['./editvalue.component.scss']
})
export class EditvalueComponent {
  category: string = "";
  error: string ="";
  constructor( public dialogRef: MatDialogRef<EditvalueComponent>,@Inject(MAT_DIALOG_DATA) public val: {attname: string, attvalue: Value}, public attributeService:AttributeService) {
    this.category =val.attvalue.value;
  }

  isValid(){
    if(this.category == this.val.attvalue.value)
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
    console.log(this.category)
    this.isValid() && this.attributeService.editValue(this.category,this.val.attvalue.id).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
