import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-newvalue',
  templateUrl: './newvalue.component.html',
  styleUrls: ['./newvalue.component.scss']
})
export class NewvalueComponent {
  value: string = "";
  error: string ="";
  constructor( public dialogRef: MatDialogRef<NewvalueComponent>,@Inject(MAT_DIALOG_DATA) public attribute_id:number, public attributeService: AttributeService) {
    
  }

  isValid(){
    if(this.value =="")
      this.error = "Field can not be null";
    return this.error ==="" ? true : false;
  }
  close(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.error = "";
    this.isValid() && this.attributeService.addAttributeValue(this.attribute_id,this.value).subscribe(data=>{
      this.dialogRef.close();
        },
        error=>{
          this.error = error.error;
        })
      
  }
}
