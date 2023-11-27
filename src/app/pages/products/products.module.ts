import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ChipsModule } from 'primeng/chips';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
// Swiper Slider

import { SlickCarouselModule } from 'ngx-slick-carousel';
// Module
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

// Component
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoriesComponent } from './categories/categories.component';
import {  VariationComponent } from './variation/variation.component';
import { VariationOptionComponent } from './variationOption/variationOption.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UpdateProductItemComponent } from './update-product-item/update-product-item.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import{MatFormFieldModule}from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductGridComponent,
    ProductOverviewComponent,
    ProductCreateComponent,
    CategoriesComponent,
    VariationComponent,
    VariationOptionComponent,
    UpdateProductItemComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxDropzoneModule,
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    TableModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    DataViewModule,
    GalleriaModule,
    FileUploadModule,
    HttpClientModule,
    ChipsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    DialogModule,
    EditorModule,
    PaginatorModule,
    SlickCarouselModule,
    TooltipModule,
    ReactiveFormsModule

  ]
})
export class ProductsModule { }
