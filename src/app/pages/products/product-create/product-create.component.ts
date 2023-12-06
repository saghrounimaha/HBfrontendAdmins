import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { events } from './../../extrapages/calendar/data';
import { Variation } from './../../../models/variation.model';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/productservice.service';
import { VariationService } from 'src/app/service/variation.service';
import { VariationOptionService } from 'src/app/service/variation-option.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductItemComponent } from '../update-product-item/update-product-item.component';
import { PormotionService } from 'src/app/service/pormotion.service';
import { ProductItemService } from 'src/app/service/product-item.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  productForm!: UntypedFormGroup;
  productItemForm!:UntypedFormGroup;
  product: Product = {
    name: "",
    description: '',
    dateCreated: '',
    price:0,
    sku:'',
    quantityInStock:0,
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
  promotionList:any[]=[]
  productaded: any;

  text!: string
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  formGroup!: FormGroup;
  tableForm!: FormGroup;
  editableModel!: boolean;
  removeIds: any;
  display!: boolean;


  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private fb: FormBuilder,
    private productService: ProductService, private categoryService: CategoryserviceService
    , private variationService: VariationService,
    private variationOptionService: VariationOptionService,
    private dialog: MatDialog ,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private promotionService:PormotionService,
    private productItemService:ProductItemService,
    private renderer: Renderer2
    ) {

  }
  ngOnInit(): void {

    this.getAllCategories();
    this.getAllVariations();
    this.getAllPromotion();



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
      category: [null, Validators.required],
      price: ['', Validators.required],
      sku: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      dateProduction: [null, Validators.required],

    });

    console.log(this.productForm)
    this.productItemForm = this.formBuilder.group({
      price: ['', Validators.required],
      sku: ['', Validators.required],
      quantity: ['', Validators.required],
    });

  }

  // images: File | null = null;

  // onFileSelected(event: any): void {
  //   const fileInput = event.target.files[0];
  //   console.log(fileInput);

  //   if (fileInput) {
  //     this.images = fileInput;
  //   }
  // }

  createProduct(): void {
    console.log(this.productForm)


    const newProduct = {
     name:this.productForm.value.name,
     description:this.productForm.value.description,
     ShortDescription:this.productForm.value.shortDescription,
      quantityInStock:this.productForm.value.quantityInStock,
     price:this.productForm.value.price,
      dateProduction:this.productForm.value.dateProduction,
     sku:this.productForm.value.sku,
     productItems:this.formatTable(this.productItems)
    };
console.log(newProduct)

    this.productService.addProduct(newProduct,this.productForm.value.category).subscribe({
      next: (response: any) => {
         this.productaded=response
        console.log('Product created successfully:', response);
        this.toastr.success("Product Created successfully!! ")

        this.AddImage(this.productaded.id_product);

        this.productForm.reset();
        this.router.navigate(['/products/product-grid']);

      },
      error: (error) => {
        console.error('Error creating product:', error);
      },
    });
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

  openDialog() {
   this.dialog.open (UpdateProductItemComponent,{width:"500px"});
  }



  getAllPromotion() {
    return this.promotionService.getAllPromotion().subscribe({
      next: (response: any) => {
        this.promotionList = response;
      },
      error: (error) => {
        console.error('Error fetching promotion:', error);
      },
    });
  }




  //updateproductitem
  showDialog(id: any) {
    this.removeIds = id
    this.display = true;
  }

  // modal
  showPositionDialog() {
    this.editableModel = true;
  }
  editProductItem(productItem: any) {
    this.selectedProductItem=productItem;
    console.log(productItem);
    console.log('Form before setting values:', this.productForm.value);
    this.editableModel = true;
    setTimeout(() => {
      var modelTitle = document.querySelector('.modal-title') as HTMLDivElement;
      modelTitle.innerHTML = 'Update Promotion';
      var updateBtn = document.getElementById('add-btn') as HTMLDivElement;
      updateBtn.innerHTML = 'Update Promotion';
    }, 0);

    this.productItemForm.controls['price'].setValue(productItem.price);
    this.productItemForm.controls['quantity'].setValue(productItem.quantity);
    this.productItemForm.controls['sku'].setValue(productItem.sku);

  }








  deleteRecord() {
    this.productItems.splice(this.removeIds, 1)
    this.display = false;
  }

  selectedProductItem:any
   updateProductItem(){
    if(this.productItemForm.valid){
      this.selectedProductItem.sku=this.productItemForm.value.sku
      this.selectedProductItem.price=this.productItemForm.value.price
      this.selectedProductItem.quantity=this.productItemForm.value.quantity
      this.productItems.forEach((item:any)=>{
         if(this.areArraysEqual(item.options,this.selectedProductItem.options)){
            item.sku=this.selectedProductItem.sku
            item.price=this.selectedProductItem.price
            item.quantity=this.selectedProductItem.quantity
            return;
         }

      })
      this.editableModel = false;

    }


   }

   areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }


  images: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.images.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }
  AddImage(productId: number): void {
    if (this.images && this.images.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < this.images.length; i++) {
        formData.append('images', this.images[i]);
      }

      this.productService.addimageproduct(productId, formData).subscribe(
        response => {
          console.log('Images added successfully:', response);
        },
        error => {
          console.error('Error adding images:', error);
        }
      );
    } else {
      console.error('No images selected');
    }
  }

}
