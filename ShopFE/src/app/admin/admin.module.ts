import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialModule } from '../angular-material.module';
import { TemplateComponent } from './template/template.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { EditshopComponent } from './editshop/editshop.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { AtributesComponent } from './atributes/atributes.component';
import { EditcategoryComponent } from './dialogs/editcategory/editcategory.component';
import { EditsubcategoryComponent } from './dialogs/editsubcategory/editsubcategory.component';
import { EditattributeComponent } from './dialogs/editattribute/editattribute.component';
import { NewvalueComponent } from './dialogs/newvalue/newvalue.component';
import { NewsubcatComponent } from './dialogs/newsubcat/newsubcat.component';
import { EditvalueComponent } from './dialogs/editvalue/editvalue.component';
import { BaseproductComponent } from './baseproduct/baseproduct.component';
import { AddbaseproductComponent } from './addbaseproduct/addbaseproduct.component';
import { AddvariantComponent } from './addvariant/addvariant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VariantsComponent } from './variants/variants.component';
import { EditbaseproductComponent } from './dialogs/editbaseproduct/editbaseproduct.component';
import { NewsubcategoryComponent } from './dialogs/newsubcategory/newsubcategory.component';
import { EditvariantComponent } from './dialogs/editvariant/editvariant.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TemplateComponent,
    EditshopComponent,
    CategoryComponent,
    AddcategoryComponent,
    AtributesComponent,
    EditcategoryComponent,
    EditsubcategoryComponent,
    EditattributeComponent,
    NewvalueComponent,
    NewsubcatComponent,
    EditvalueComponent,
    BaseproductComponent,
    AddbaseproductComponent,
    AddvariantComponent,
    VariantsComponent,
    EditbaseproductComponent,
    NewsubcategoryComponent,
    EditvariantComponent,
    UsersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CanvasJSAngularChartsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class AdminModule { }
