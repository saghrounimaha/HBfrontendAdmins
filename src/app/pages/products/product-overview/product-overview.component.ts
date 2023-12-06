import { Component, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { PormotionService } from 'src/app/service/pormotion.service';
import { ProductItemService } from 'src/app/service/product-item.service';
import { ProductService } from 'src/app/service/productservice.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {
  qty: any = 1;
  productForm!: UntypedFormGroup;
  productItemForm!:UntypedFormGroup;
  product:any
  loadedImages:any[]=[]
  categories:any[]=[]
  productItems:any[]=[]
  promotionList:any[]=[]
  reviewList:any[]=[]
  editableModel!: boolean;
  removeIds: any;
  display!: boolean;
  breadCrumbItems!: Array<{}>;
  text!: string
  images: File | null = null;
  productItemList:any[]=[]

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  // bread crumb items
  slides: any
  isRTL: any = false;

  colorOptions: string[] = [];
  sizeOptions: string[] = [];

  constructor(private productService:ProductService,
    private route:ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private reviewsService:ReviewService
    ){}
  ngOnInit() {
    /**
     * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Products' },
      { label: 'Overview', active: true }
    ];

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
      quantityInStock: ['', Validators.required],
    });

    const direction = document.documentElement.getAttribute('dir')
    if (direction == 'ltr') {
      this.isRTL = false
    } else {
      this.isRTL = true
    }

    setTimeout(() => {
      this.slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: this.isRTL
      };
    });

    this.slides = [
      {
        previewImageSrc: 'assets/images/products/img-31.png',
        thumbnailImageSrc: 'assets/images/products/img-31.png'
      },
      {
        previewImageSrc: 'assets/images/products/img-32.png',
        thumbnailImageSrc: 'assets/images/products/img-32.png'
      },
      {
        previewImageSrc: 'assets/images/products/img-33.png',
        thumbnailImageSrc: 'assets/images/products/img-33.png'
      },
      {
        previewImageSrc: 'assets/images/products/img-34.png',
        thumbnailImageSrc: 'assets/images/products/img-34.png'
      },
      {
        previewImageSrc: 'assets/images/products/img-32.png',
        thumbnailImageSrc: 'assets/images/products/img-32.png'
      }
    ]
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: this.isRTL
  };


  config = {
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    arrows: false,
  }


  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist')

    swiper.forEach((el: any) => {
      el.classList.remove('swiper-slide-thumb-active')
    })
    event.target.closest('.swiperlist').classList.add('swiper-slide-thumb-active')
    this.slickModal.slickGoTo(id)
  }

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
    console.log(event.currentSlide)
  }






  loadProductDetails(productId: number): void {
    this.productService.getByIdProduct(productId).subscribe({
      next: (products:any) => {
        this.product = products;
        console.log(products)
        this.loadImages(this.product.id_product)
        console.log(this.product)
        this.productItems=this.product.productItems
        this.updateFormWithProductDetails();

        this.colorOptions = this.filterVariationOptions('color');
      this.sizeOptions = this.filterVariationOptions('size');
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  selectedColor: string = '';
selectedSize: string = '';
filterVariationOptions(variationName: string): string[] {
  const options: string[] = [];

  for (const productItem of this.productItems) {
    for (const variationOption of productItem.variationOptions) {
      if (variationOption.variation.name.toLowerCase() === variationName.toLowerCase()) {
        options.push(variationOption.value);
      }
    }
  }
  return Array.from(new Set(options));
}

getQuantityInStock(sizeOption: string): number {
  const productItem = this.productItems.find(item => {
    return item.variationOptions.some((option:any) => option.value === sizeOption);
  });
  return productItem ? productItem.quantityInStock : 0;
}
getTooltip(quantityInStock: number): string {
  return quantityInStock === 0 ? 'Out of Stock' : `${quantityInStock} Items Available`;
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


  reviews: number = 0
   countRviews(): void {
    this.reviewsService.countReview().subscribe({
      next: (count:any) => {
        this.reviews = count;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  ratinglist:any[]=[]
  Raiting(): void {
    const productId = this.productItemForm.value;
    this.reviewsService.getRaitingbyIdProuduct(productId).subscribe({
      next: (reviews:any) => {
        this.ratinglist = reviews;
        this.calculateAverageRating()
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
  averageRating: number = 0;
  calculateAverageRating(): void {
    if (this.ratinglist.length > 0) {
      const totalRating = this.ratinglist.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = totalRating / this.ratinglist.length;
    } else {
      // Set a default value or handle the case where there are no ratings
      this.averageRating = 0;
    }

}
}
