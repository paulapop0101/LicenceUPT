import { Component, ViewChild } from '@angular/core';
import { EditvalueComponent } from '../dialogs/editvalue/editvalue.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { VariantModel } from 'src/app/Models/products/variantModel';
import { Subcategory } from 'src/app/Models/subcategory';
import { Value } from 'src/app/Models/value';
import { ProductService } from 'src/app/services/product.service';
import { Attribute } from 'src/app/Models/attribute';
import { EditbaseproductComponent } from '../dialogs/editbaseproduct/editbaseproduct.component';
import { EditvariantComponent } from '../dialogs/editvariant/editvariant.component';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  page5: boolean = true;
  subcategories: Subcategory[] = [];
  range = new FormControl( "",Validators.min(0));
  products: Baseproducts[] = [];
  variant : VariantModel = new VariantModel();
  tableVariant : VariantModel = new VariantModel();
  error_message: string = "";
  bool_true : boolean = true;
  isProductSelected : boolean = false;
  selection : Map<Value,boolean> = new Map();
  assignedValues : Attribute[] = [];
  dataSource! : MatTableDataSource<any>;
  ELEMENT_DATA: any[]=[];
  selectionCheck = new SelectionModel<VariantModel>(true, []);
  constructor(public router : Router, public productService: ProductService,public dialog: MatDialog) {
    productService.getProducts().subscribe(
      data=>{
        this.products = data;
      }
    )

  }
  ngOnInit() {
    this.productService.getVariants().subscribe(
      data=>{

        for (let index = 0; index < data.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: data[index].id,
              name: data[index].name ,
              price: data[index].price,
              quantity :data[index].quantity,
              date: data[index].added_date,
              assignedValues: data[index].assignedValues,
              productId: data[index].productId,
              imageSRC: data[index].url
            });

        }
        console.log(this.ELEMENT_DATA);

        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  logOut(){
    localStorage.removeItem('user');
   this.router.navigate(['']);
 }

 productSelected(){
  console.log(this.variant.product_id)
  this.isProductSelected = true;

  this.productService.getAssignedValues(this.variant.product_id).subscribe(
    data=>{

      this.assignedValues=data;
      this.assignedValues.forEach(element => {
            element.values.forEach(el => {
                this.selection.set(el,false);
       });
      });
    }

  )
 }

 attributeSelected(attribute: Attribute , value : Value, data:any){
  for(let val of attribute.values)
      this.selection.set(val,data.selected);
    this.selection.set(value,false);
 }
 createProduct : boolean = false;

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
   let numSelected = this.selectionCheck.selected.length;
   let numRows;
   this.dataSource ? numRows = this.dataSource.data.length : numRows = 0;
   return numSelected === numRows;
  return true;
 }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 toggleAllRows() {
   if (this.isAllSelected()) {
     this.selectionCheck.clear();
     return;
   }

   this.selectionCheck.select(...this.dataSource?.data);
 }

 /** The label for the checkbox on the passed row */
 checkboxLabel(index? : number,row?: any): string {
   if (!row) {
     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
   }
   return `${this.selectionCheck.isSelected(row) ? 'deselect' : 'select'} row ${index}`;

 }

 displayedColumns: string[] = ['select','position','image', 'name','price','quantity','date','attributes','edit'];





 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

onSubmit(){
 this.error_message="";


}
deleteProduct(product_id : number,element_index:number){
  console.log(product_id);
    this.productService.deleteVariant(product_id).subscribe(
      data=>console.log(data),
      error=>console.log(error.error)
    )
    this.ELEMENT_DATA.splice(element_index,1);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
deleteProducts(){
  if(this.selectionCheck.selected.length>0){
    let list : number[] = [];
    this.selectionCheck.selected.forEach(element => {
      list.push(element.id)
    });
    this.productService.deleteVariants(list).subscribe(
      data=>console.log(data)
    )
    window.location.reload();
}

 }

 createButton(){
   this.createProduct = !this.createProduct;
 }

 openDialog(index : VariantModel) {

  const dialogRef =this.dialog.open(EditvariantComponent, {
    minWidth: '200px',
    width:'500px',
    data: index
  });
  dialogRef.afterClosed().subscribe(result => {
    this.ELEMENT_DATA = [];
    this.productService.getVariants().subscribe(
      data=>{

        for (let index = 0; index < data.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: data[index].id,
              name: data[index].name ,
              price: data[index].price,
              quantity :data[index].quantity,
              date: data[index].added_date,
              assignedValues: data[index].assignedValues,
              productId: data[index].productId,
              imageSRC: data[index].url
            });

        }
        console.log(this.ELEMENT_DATA);

        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  });

}
}
