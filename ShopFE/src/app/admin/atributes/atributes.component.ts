import { Component } from '@angular/core';
import { EditattributeComponent } from '../dialogs/editattribute/editattribute.component';
import { MatDialog } from '@angular/material/dialog';
import { EditvalueComponent } from '../dialogs/editvalue/editvalue.component';
import { NewvalueComponent } from '../dialogs/newvalue/newvalue.component';
import { NewsubcatComponent } from '../dialogs/newsubcat/newsubcat.component';
import { AttributeService } from 'src/app/services/attribute.service';
import { Attribute } from 'src/app/Models/attribute';
import { Value } from 'src/app/Models/value';
import { Subcategory } from 'src/app/Models/subcategory';

@Component({
  selector: 'app-atributes',
  templateUrl: './atributes.component.html',
  styleUrls: ['./atributes.component.scss']
})
export class AtributesComponent {
  newAttribute : Attribute = new Attribute();
  error: string = "";
  attributes: Attribute[] = [];
  constructor(public dialog: MatDialog, public attributeService: AttributeService){
    this.newAttribute.isOnPDP = false;
    this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
  }
  deleteValue(index: number){
    this.attributeService.deleteAttributeValue(index).subscribe(
      data=>{
        this.attributeService.getAttributes().subscribe(data=>this.attributes=data);
      }
    )
  }
  deleteAttribute(index:number){
    this.attributeService.deleteAttribute(index).subscribe(
      data=> this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    )
  }
  deleteSubcategory(index:number, sub:Subcategory){
    this.attributeService.deleteSubcategory(index,sub).subscribe(
      data=>this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    )
  }
  editCat(index: number){

  }
  isValid(){
    if(this.newAttribute.name==="" || this.newAttribute.name === null)
      this.error = "All fields are mandatory";
    return this.error==="" ? true: false;
  }
  // isValidS(){
  //   if(this.newSubcategory==="" || this.selectedId === 0)
  //     this.suberror = "All fields are mandatory";
  //   return this.suberror==="" ? true: false;
  // }
  addAttribute(){
    this.error = "";
    this.isValid() && this.attributeService.addAttribute(this.newAttribute).subscribe(data=>{
      this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
      this.newAttribute = new Attribute();
    },
    error=>{
      this.error = error.error;
    })
  }
  editAttribute(att : Attribute) {

    const dialogRef =this.dialog.open(EditattributeComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: att
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    });
  
  }
  editValue(value : Value, att : string) {

    const dialogRef =this.dialog.open(EditvalueComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: {
        attname : att,
        attvalue: value}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    });
  
  }
  newValue(id : number) {

    const dialogRef =this.dialog.open(NewvalueComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    });
  
  }
  newSubcat(index:number) {

    const dialogRef =this.dialog.open(NewsubcatComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attributeService.getAttributes().subscribe(data=>this.attributes=data)
    });
  
  }
}
