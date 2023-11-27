import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    BreadcrumbsComponent,
    MaterialModule
  ]
})
export class SharedModule { }
