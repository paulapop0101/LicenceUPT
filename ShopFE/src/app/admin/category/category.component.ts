import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { EditcategoryComponent } from '../dialogs/editcategory/editcategory.component';
import { EditsubcategoryComponent } from '../dialogs/editsubcategory/editsubcategory.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Models/category';
import { Subcategory } from 'src/app/Models/subcategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  categories: Category[] = [];
  constructor(public dialog: MatDialog, private categoryService: CategoryService){
    categoryService.getCategories().subscribe(data=>this.categories=data)
  }
  deleteCat(index: number){
    this.categoryService.deleteCategory(index).subscribe(data=>{ this.categoryService.getCategories().subscribe(data=>this.categories=data)});

  }
  deleteSubcat(index: number){
    this.categoryService.deleteSubcategory(index).subscribe(data=>{ this.categoryService.getCategories().subscribe(data=>this.categories=data)});
   
  }
  openDialog(cat: Category) {
    const dialogRef =this.dialog.open(EditcategoryComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: cat
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryService.getCategories().subscribe(data=>this.categories=data)
    });
  
  }
  openDialogSub(subcategory: Subcategory) {

    const dialogRef =this.dialog.open(EditsubcategoryComponent, {
      minWidth: '200px',
      width:'500px',
      minHeight: '15em',
      data: subcategory
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryService.getCategories().subscribe(data=>this.categories=data)
    });
  
  }
}
