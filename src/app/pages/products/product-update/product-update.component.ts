import { Category } from './../../../models/category.model';
import { Product } from './../../../models/product.model';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Component, OnInit,Renderer2 } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductItem } from 'src/app/models/ProductItem.model';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { PormotionService } from 'src/app/service/pormotion.service';
import { ProductItemService } from 'src/app/service/product-item.service';
import { ProductService } from 'src/app/service/productservice.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent  implements OnInit{
  brands: any;
  displayPosition!: boolean;
  categoriesForm!: UntypedFormGroup;
  productForm!: UntypedFormGroup;
  productItemForm!:UntypedFormGroup;
  imageForm!:UntypedFormGroup;
  product:any
  loadedImages:any[]=[]
  categories:any[]=[]
  productItems:any[]=[]
  promotionList:any[]=[]
  editableModel!: boolean;
  removeIds: any;
  display!: boolean;
  breadCrumbItems!: Array<{}>;
  text!: string

  constructor(private productService:ProductService,
    private categoryService:CategoryserviceService,
    private route:ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private promotionService:PormotionService,
    private productItemService:ProductItemService,
    private renderer: Renderer2,
    private toastr:ToastrService,
    ){}

    ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Products' },
        { label: 'Update Product', active: true }
      ];
      this.getAllCategories();
      this.getAllPromotion();
      this. getAllProductItem();
      const productId = this.route.snapshot.params['id'];
      if (productId) {
        this.loadProductDetails(productId);
      }

      this.productForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        shortDescription: ['', Validators.required],
        price: ['', Validators.required],
        sku: ['', Validators.required],
        quantityInStock: ['', Validators.required],
        category: [null, Validators.required],
        promotion: [null],
        dateProduction:['']

      });

      this.productItemForm = this.formBuilder.group({
        price: ['', Validators.required],
        sku: ['', Validators.required],
        quantity: ['', Validators.required],
      });
      this.imageForm =this.formBuilder.group({
        imageURL: [],

      });
    }




    loadProductDetails(productId: number): void {
      this.productService.getByIdProduct(productId).subscribe({
        next: (products:any) => {
          this.product = products;
          this.loadImages(this.product.id_product)
          console.log(this.product)
          this.productItems=this.product.productItems
          console.log(this.productItems)
          this.updateFormWithProductDetails();
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        },
      });
    }


    loadImages(productId: number): void {
      this.productService.getImageProduct(productId).subscribe({
        next: (images:any) => {
          this.loadedImages = images;
          console.log(this.images)
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        },
      });
    }


    updateFormWithProductDetails() {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        shortDescription: this.product.shortDescription,
        dateProduction:this.product.dateProduction,
        price: this.product.price,
        sku: this.product.sku,
        quantityInStock: this.product.quantityInStock,
        category: this.product.category.id_category,
        promotion: this.product.promotions ? this.product.promotions.id_promotion : null,
      });
      console.log(this.product.promotions)

        console.log(this.product.images)

        const imagesControl = this.productForm.get('images');
        console.log(imagesControl)

        if (imagesControl) {
          const imageUrl = URL.createObjectURL(this.product.images);
          imagesControl.patchValue(imageUrl);

          const imgElement = document.getElementById('category-img') as HTMLImageElement;
          if (imgElement) {
            imgElement.src = imageUrl;
          }
        }
        console.log(imagesControl)


      console.log('Form value after patch:', this.productForm.value);
    }



    getAllCategories() {
      this.categoryService.getAllCategories().subscribe({
        next: (response: any) => {
          this.categories = response;
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
    }
    getAllPromotion() {
      return this.promotionService.getAllPromotion().subscribe({
        next: (response: any) => {
          this.promotionList = response;
          console.log('Promotion fetched successfully:', response);
        },
        error: (error) => {
          console.error('Error fetching promotion:', error);
        },
      });
    }

    formatTable(table: any) {
      return table.map((elem: any) => {
        let object = { sku: "", price: 0, quantity: 0, options: elem.options.map((o: any) => o.value) }
        return object;
      });
    }


    updateProduct() {
      const productId = this.route.snapshot.params['id'];

      if (this.productForm.valid && productId) {
        const updatedProduct = {
          name:this.productForm.value.name,
          description: this.productForm.value.description,
          shortDescription: this.productForm.value.shortDescription,
          price: this.productForm.value.price,
          sku:this.productForm.value.sku,
          quantityInStock: this.productForm.value.quantityInStock,
          dateProduction:this.productForm.value.dateProduction
        }

        this.productService.updateProduct(productId, updatedProduct,this.productForm.value.category,
          this.productForm.value.promotion).subscribe({
          next: (updateProd: any) => {
            this.toastr.success(`${this.product.name} Updated successfully!!`);
            console.log('Product updated successfully:', updateProd);
            this.loadProductDetails(productId)
          },
          error: (error) => {
            console.error('Error updating product:', error);
          },
        });
      }
    }





    showDialog(id: any) {
      this.removeIds = id
      this.display = true;
    }

    // modal
    showPositionDialog() {
      this.editableModel = true;
    }
    editProductItem(productItem: any) {
      console.log(productItem);
      console.log(productItem.id);
      this.editableModel = true;
      setTimeout(() => {
        var modelTitle = document.querySelector('.modal-title') as HTMLDivElement;
        modelTitle.innerHTML = 'Update Promotion';
        var updateBtn = document.getElementById('add-btn') as HTMLDivElement;
        updateBtn.innerHTML = 'Update Promotion';
      }, 0);
      this.idProductItem=productItem.id
      this.productItemForm.controls['price'].setValue(productItem.price);
      this.productItemForm.controls['quantity'].setValue(productItem.quantityInStock);
      this.productItemForm.controls['sku'].setValue(productItem.sku);

    }




    idProductItem:number=0
    updateProductItem() {
      const updatedProductItem = this.productItemForm.value;

      const updateFields: any = {};

      if ('sku' in updatedProductItem && updatedProductItem.sku !== null && updatedProductItem.sku !== undefined) {
        updateFields.sku = updatedProductItem.sku;
      }

      if ('quantity' in updatedProductItem && updatedProductItem.quantity !== null && updatedProductItem.quantity !== undefined) {
        updateFields.quantity = updatedProductItem.quantity;
      }

      if ('price' in updatedProductItem && updatedProductItem.price !== null && updatedProductItem.price !== undefined) {
        updateFields.price = updatedProductItem.price;
      }

      this.productItemService.updateProductItem(this.idProductItem, updateFields).subscribe({
        next: (response) => {
          console.log('ProductItem updated successfully:', response);
          this. getAllProductItem()
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating product item:', error);
        },
      });
      this.editableModel = false;
    }


    deleteRecord() {
      this.productItems.splice(this.removeIds, 1)
      this.productItemService.deleteProductItems(this.removeIds).subscribe(
        (response) => {
          console.log('Category deleted successfully:', response);
          this.display = false;
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
      this.display = false;
    }












    showBasicDialog() {
      this.displayPosition = true;
    }


    // File Upload
    images: FileList | null = null;
    fileChange(event: any) {
      const fileList: FileList | null = (event.target as HTMLInputElement).files;

      if (fileList) {
        this.images = fileList;
        this.imageForm.patchValue({});

        const reader = new FileReader();
        reader.onload = () => {
          (document.getElementById('brandLogo-img') as HTMLImageElement).src = reader.result as string;
        };

        reader.readAsDataURL(this.images[0]);
      }
    }

    updateImage(): void {
      const productId = this.route.snapshot.params['id'];

      if (this.images && this.images.length > 0) {
        const formData = new FormData();
        formData.append('newImage', this.images[0]);

        this.productService.updateImage(productId, formData).subscribe(
          response => {
            console.log('Image added successfully:', response);
            this.loadProductDetails(productId)
          },
          error => {
            console.error('Error adding image:', error);
          }
        );
      } else {
        console.error('No image selected');
      }
      this.displayPosition = false;
    }


    getAllProductItem() {
      return this.productItemService.getAllProductItem().subscribe({
        next: (response: any) => {

          console.log('Promotion fetched successfully:', response);
        },
        error: (error) => {
          console.error('Error fetching promotion:', error);
        },
      });
    }




  }

