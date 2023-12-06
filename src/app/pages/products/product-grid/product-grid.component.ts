import { Component } from '@angular/core';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { ProductService } from 'src/app/service/productservice.service';
import { DataView } from 'primeng/dataview';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  products: any;
  first: number = 1;
  endIndex: number = 6;
  rangeValues: number[] = [0, 2000];
  range1: any;
  range2: any;
  productlist:any[]=[]
  filter:any[]=[]
  sortOptions: any;
  sortOrder: any;
  sortField: any;
  categories: any[]= [];
  sortDirection: 'asc' | 'desc' = 'asc';
  removeIds: any;
  display!: boolean;



  constructor(private productService:ProductService,private categoryService:CategoryserviceService){}

  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategories()
    this.filterByPriceRange();

    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Products' },
      { label: 'Product Grid', active: true }
    ];

    // Fetch Data
    this.products = this.productlist

    this.range1 = '$ ' + this.rangeValues[0]
    this.range2 = '$ ' + this.rangeValues[1]
  }



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

  // Sorting
  onSortChange(event: any) {
    let value = event.target.value;
    if (value == 'low_to_high') {
      this.products.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    } else if (value == 'high_to_low') {
      this.products.sort((a: any, b: any) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      this.products = this.productlist;
    }
  }

  showDialog(id: any) {
    this.removeIds = id
    this.display = true;
  }
  deleteRecord() {
    this.productlist.splice(this.removeIds, 1)
    this.productService.deleteProduct(this.removeIds).subscribe(
      (response) => {
        console.log('Product deleted successfully:', response);
        this.getAllProduct();
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


}
