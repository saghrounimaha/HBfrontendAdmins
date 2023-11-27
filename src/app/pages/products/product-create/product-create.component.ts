import { events } from './../../extrapages/calendar/data';
import { Variation } from './../../../models/variation.model';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/productservice.service';
import { VariationService } from 'src/app/service/variation.service';
import { VariationOptionService } from 'src/app/service/variation-option.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductItemComponent } from '../update-product-item/update-product-item.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  productForm!: UntypedFormGroup;
  product: Product = {
    name: "",
    description: '',
    dateCreated: '',
    isApproved: false,
    category: null,
    reviews: null,
    promotions: null,
    images: null,
    owner: null,
    productItems: null
  };
  categories: any[] = [];
  Variations: any[] = []
  VariationsOption: any[] = []
  text!: string
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  formGroup!: FormGroup;

  tableForm!: FormGroup;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private fb: FormBuilder,
    private productService: ProductService, private categoryService: CategoryserviceService
    , private variationService: VariationService,
    private variationOptionService: VariationOptionService,
    private dialog: MatDialog ,
    private toastr:ToastrService
    ) {

  }
  ngOnInit(): void {

    this.getAllCategories()
    this.getAllVariations()
   // this.addForm()
    /**
     * BreadCrumb
     */

    this.tableForm = this.fb.group({
      items: this.fb.array([]),
    });

    // Assuming productItems is an array of objects


    this.breadCrumbItems = [
      { label: 'Products' },
      { label: 'Create Product', active: true }
    ];
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      images: [null],
      namecategory: [null, Validators.required],
      price: ['', Validators.required],
      sku: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      variation: [null, Validators.required],

    });

    console.log(this.productForm)


  }

  images: File | null = null;

  onFileSelected(event: any): void {
    const fileInput = event.target.files[0];
    console.log(fileInput);

    if (fileInput) {
      this.images = fileInput;
    }
  }

  createProduct(): void {
    console.log(this.productForm)


    const newProduct = {
      category: {
        id_category: this.productForm.value.namecategory,

      },
      productItems: [{
        SKU: this.productForm.value.sku,
        price: this.productForm.value.price,
        quantityInStock: this.productForm.value.quantityInStock,
      }],
      variation: {
        id: this.productForm.value.variation
      },
      variationoption: {}

    };


    // this.productService.addProduct(this.product).subscribe({
    //   next: (response: any) => {
    //     console.log('Product created successfully:', response);
    //     this.productForm.reset();
    //     this.toastr.success("Product Created successfully!! ")

    //     //this.images = null;
    //   },
    //   error: (error) => {
    //     console.error('Error creating product:', error);
    //   },
    // });
  }


  onVarationSelected(event: any) {
    if (event.target) {
      this.variationOptionService.getAllVaritionOptionbyVariation(event.target.value).subscribe({
        next: (response: any) => {
          this.VariationsOption = response;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      })

    }
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
  getAllVariations() {
    return this.variationService.getAllVarition().subscribe({
      next: (response: any) => {
        this.Variations = response;
      },
      error: (error) => {
        console.error('Error fetching variations:', error);
      },
    });
  }

  getAllVariationOption() {
    return this.variationOptionService.getAllVarition().subscribe(
      (response: any) => {
        this.VariationsOption = response;
      },
      (error) => {
        console.error('Error fetching variations:', error);
      }
    );

  }



  productItems: any[] = []
  getProdctItems(event: any) {
    if (event.target) {
      let idOption = event.target.value;
      let option = this.VariationsOption.find((opt) => opt.id == idOption);

      if (this.productItems.length === 0) {
        let obj={ sku: "", price: 0, quantity: 0, options: [option] }
        this.productItems.push(obj);
        this.addForm(obj);
      } else {
        // Check if the option already exists in productItems
        let exists = this.productItems.some((item) => item.options.some((o: any) => o.value === option.value));

        if (!exists) {
          // If the option doesn't exist, add it to the existing item or create a new item
          let insert = false;
          let elems: any[] = [];
          this.productItems.forEach((item: any) => {
            let existingOption = item.options.find((o: any) => o.variation.name == option.variation.name);
            if (existingOption) {
              elems = item.options.filter((elem: any) => elem.variation.name != option.variation.name)
              elems.push(option)
              let obj2={ sku: "", price: 0, quantity: 0, options: elems }
              this.productItems.push(obj2);
              this.addForm(obj2);
            } else {
              insert = false
              item.options.push(option)
            }
          })
        }
      }
      // this.productItems=this.formatTable(this.productItems)
      console.log(this.formatTable(this.productItems));
    }
  }

  formatTable(table: any) {
    return table.map((elem: any) => {
      let object = { sku: "", price: 0, quantity: 0, options: elem.options.map((o: any) => o.value) }
      return object;
    });
  }


  logdata() {
    console.log(this.productItems)
  }


  // tableForm = this.fb.group({
  //   productItems: this.fb.array([])
  // })

  // get items(){
  //   return this.tableForm.controls['productItems'] as FormArray
  // }

   itemForm = this.fb.group({
    sku: [''],
    price: [''],
    quantity:['']
  });

  // addForm() {
  // this.productItems.forEach((elem)=>{

  //   this.items.push(this.itemForm);
  // }
  // )
  // console.log(this.items)
  // }

  get items() {
    return (this.tableForm.get('items') as FormArray).controls;
  }

  addForm(obj:any) {
    // Add a new form group to the form array
    const newItemFormGroup = this.fb.group({
      options:[''],
      sku: [''],
      price: [''],
      quantity: [''],
    });
     let options=obj.options.map((elem:any)=>elem.value);
      newItemFormGroup.patchValue({
        options:options,
        sku:obj.sku,
        price:obj.price,
        quantity:obj.quantity
      });
      (this.tableForm.get('items') as FormArray).push(newItemFormGroup);

  }


  openDialog(item: any) {
    const dialogRef = this.dialog.open(UpdateProductItemComponent, {
      width: '400px',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Traiter le résultat si nécessaire après la fermeture de la boîte de dialogue
      console.log('Boîte de dialogue fermée avec résultat :', result);
    });
  }











  files: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }




}
