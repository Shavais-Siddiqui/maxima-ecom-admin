import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatSidenavModule } from '@angular/material/sidenav';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatChipsModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSliderModule,
  MatMenuModule,
  MatDialogModule

} from '@angular/material';
import { ProductsComponent } from './products/products.component';
import { ComponentsModule } from './components/components.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    ComponentsModule

  ],
  declarations: [
    DashboardComponent,
    ProductsComponent,
  ]
})

export class AdminLayoutModule {}
