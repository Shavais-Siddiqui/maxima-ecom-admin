import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { CategoryListComponent } from './category-list/category-list.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { AddFieldsComponent } from './add-fields/add-fields.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgxGalleryModule } from 'ngx-gallery';

const config: InputFileConfig = {};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    InputFileModule.forRoot(config),
    NgxGalleryModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddProductComponent,
    CategoryListComponent,
    AddFieldsComponent,
    EditProductComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddProductComponent,
    CategoryListComponent
  ],
  entryComponents: [AddProductComponent, AddFieldsComponent, EditProductComponent]
})
export class ComponentsModule { }
