import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { AdminProducts } from 'src/app/Models/products/admin-products';
import { Baseproducts } from 'src/app/Models/products/baseproducts';
import { Subcategory } from 'src/app/Models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { EditbaseproductComponent } from '../dialogs/editbaseproduct/editbaseproduct.component';

@Component({
  selector: 'app-baseproduct',
  templateUrl: './baseproduct.component.html',
  styleUrls: ['./baseproduct.component.scss']
})
export class BaseproductComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA: any[]=[];
  dataSource! : MatTableDataSource<AdminProducts>;
  subcategory : Category[] = [];
  sub : Subcategory = new Subcategory();
  cat: string="";
  f : number = 0;
  error_message : string = "";
  product : Baseproducts = new Baseproducts();
  selection = new SelectionModel<AdminProducts>(true, []);
  createProduct : boolean = false;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    let numSelected = this.selection.selected.length;
    let numRows;
    this.dataSource ? numRows = this.dataSource.data.length : numRows = 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource?.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(index? : number,row?: AdminProducts): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index}`;
  }
  constructor(public router: Router, public productService: ProductService, public categoryService: CategoryService, public dialog: MatDialog) {
    categoryService.getCategories().subscribe(
      data=>{
        this.subcategory=data;
      }
    )
  }
  displayedColumns: string[] = ['select','position', 'name', 'description', 'subcategory','edit'];
  ngOnInit() {
    this.productService.getProducts().subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: data[index].id,
              name: data[index].name ,
              description: data[index].description,
              subcategory :data[index].subcategory

            });

        }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error=>console.log(error)

    )
  }

  reloadProducts(){
    this.ELEMENT_DATA = [];
    this.productService.getProducts().subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          this.ELEMENT_DATA.push(
            {
              id: data[index].id,
              name: data[index].name ,
              description: data[index].description,
              subcategory :data[index].subcategory

            });

        }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error=>console.log(error)

    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  page4: boolean = true;
  logOut(){
    localStorage.removeItem('user');
   this.router.navigate(['']);
 }

 deleteProduct(product_id : number,element_index:number){
    console.log(product_id);
    this.productService.deleteProduct(product_id).subscribe(
      data=>console.log(data),
      error=>console.log(error.error)
    )
    this.ELEMENT_DATA.splice(element_index,1);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 }
 deleteProducts(){
    if(this.selection.selected.length>0){
        let list : number[] = [];
        this.selection.selected.forEach(element => {
          list.push(element.id)
        });
        this.productService.deleteProducts(list).subscribe(
          data=>{
            this.reloadProducts()
          }
        )
    }
  }

  openDialog(index : Baseproducts) {

    const dialogRef =this.dialog.open(EditbaseproductComponent, {
      minWidth: '200px',
      width:'500px',
      data: index
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadProducts();
    });

  }
}
