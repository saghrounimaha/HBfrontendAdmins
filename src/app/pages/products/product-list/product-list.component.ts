import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
// Data Get
import { ProductService } from 'src/app/service/productservice.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

/**
 * ProductList Component
 */
export class ProductListComponent {
  @ViewChild('dt', { static: false }) dt: Table | undefined;


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  products: any;
  first: number = 1;
  endIndex: number = 10;
  rangeValues: number[] = [0, 2000];
  range1: any;
  range2: any;
  coupenForm: any;
  display!: boolean;
  removeIds: any;
  productlist:any[]=[];
  categories: any[]= [];
  filter: any[]= [];
  sortDirection: 'asc' | 'desc' = 'asc';


constructor(private productService:ProductService,private categoryService:CategoryserviceService,private router:Router){}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategories();
    this.filterByPriceRange();

        /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Products' },
      { label: 'Product List', active: true }
    ];

    this.range1 = '$ ' + this.rangeValues[0]
    this.range2 = '$ ' + this.rangeValues[1]

    // Fetch Data
    this.products = this.productlist
  }

  // delete
  showDialog(id: any) {
    this.removeIds = id
    this.display = true;
  }

  getAllProduct() {
    return this.productService.getAllProduct().subscribe({
      next: (response: any) => {
        this.productlist =this.filter= response;

        console.log('Promotion fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching promotion:', error);
      },
    });
  }

  // Range Slider


  // Pagination
  onPageChange(event: any) {
    this.first = event.first + 1;
    if (this.products.length > 0) {
      var last = this.first + event.rows
      if (last <= this.products.length) {
        this.endIndex = event.first + event.rows
      } else {
        this.endIndex = this.products.length
      }
    }
  }

  // Delete Record
  deleteRecord() {
    this.productlist.splice(this.removeIds, 1)
    this.productService.deleteProduct(this.removeIds).subscribe(
      (response) => {
        console.log('Product deleted successfully:', response);
        this.getAllProduct()
        this.display = false;
      },
      (error) => {
        console.error('Error deleting Product:', error);
      }
    );
    this.display = false;
  }

  filterByCategory(category: any) {

  this.filter=this.productlist.filter(product => product.categoryName === category.name);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }


  filterByPriceRange() {
    this.filter = this.productlist.filter(product =>
      product.price >= this.rangeValues[0] && product.price <= this.rangeValues[1]
    );
  }

  handleChange(event: any) {
    this.rangeValues = event.values;
    this.range1=this.rangeValues[0];
    this.range2=this.rangeValues[1];
    console.log(event)
    this.filterByPriceRange();
  }



  // editProduct(productId:any){
  //    this.router.navigate(['/products/product-create',{id:productId}]);
  // }

}

