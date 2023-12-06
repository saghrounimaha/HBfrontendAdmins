import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// calener
import { FullCalendarModule } from '@fullcalendar/angular';

// Countup
import { CountUpModule } from 'ngx-countup';

// dialog
import { DialogModule } from 'primeng/dialog';
// icon
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
// table
import { TableModule } from 'primeng/table';
// sidebar
import { SidebarModule } from 'primeng/sidebar';
// paginator
import { PaginatorModule } from 'primeng/paginator';
// tabview
import { TabViewModule } from "primeng/tabview";
// scrollpanel
import { ScrollPanelModule } from 'primeng/scrollpanel';
// carrosel
import { GalleriaModule } from 'primeng/galleria';
// overlaypanel
import { OverlayPanelModule } from 'primeng/overlaypanel';

// dataview
import { DataViewModule } from 'primeng/dataview';

// calender picker

import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ChipsModule } from 'primeng/chips';
import { EditorModule } from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
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
import { PromotionsComponent } from './promotions/PromotionsComponent';
import { ExtrapagesModule } from '../extrapages/extrapages.module';
import { ExtrapagesRoutingModule } from '../extrapages/extrapages-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CalendarModule } from 'primeng/calendar';
import { NgxMasonryModule } from 'ngx-masonry';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProductUpdateComponent } from './product-update/product-update.component';







@NgModule({
  declarations: [
    ProductListComponent,
    ProductGridComponent,
    ProductOverviewComponent,
    ProductCreateComponent,
    CategoriesComponent,
    VariationComponent,
    VariationOptionComponent,
    UpdateProductItemComponent,
    PromotionsComponent,
    ProductUpdateComponent

  ],
  imports: [
    TableModule,
    MaterialModule,
    ExtrapagesModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
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
    ReactiveFormsModule,


    ExtrapagesRoutingModule,
    FullCalendarModule,
    CountUpModule,
    SidebarModule,
    TabViewModule,
    NgApexchartsModule,
    ScrollPanelModule,
    CalendarModule,
    NgxMasonryModule,



  ],
   exports:[
    DialogModule,
  ]
})
export class ProductsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
