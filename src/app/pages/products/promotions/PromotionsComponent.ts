
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Coupen } from '../../extrapages/coupons/coupons';
import { coupon } from '../../extrapages/coupons/data';
import { PormotionService } from 'src/app/service/pormotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})

export class PromotionsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  products: any;
  endIndex: any = 10;
  first: any = 1;
  coupenDetail: any;
  viewdatasidebar!: boolean;
  editableModel!: boolean;
  promotionForm!: UntypedFormGroup;
  submitted = false;
  date!: Date;
  coupon!: Coupen;
  product: any;
  display!: boolean;
  row: any;
  econtent: any;
  removeIds: any;
  promotionList: any[] = []

  constructor(private formBuilder: UntypedFormBuilder, private promotionService: PormotionService) { }

  ngOnInit(): void {

    this.getAllPromotion();
    // Breadcrumb iteam
    this.breadCrumbItems = [
      { label: 'Product' },
      { label: 'Promotion', active: true }
    ];

    /**
     * Form Validation
     */
    this.promotionForm = this.formBuilder.group({
      id_promotion: [''],
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    // Fetch Datas
    this.products = this.promotionList;
  }

  // Pagination
  onPageChange(event: any) {
    this.first = event.first + 1;
    if (this.promotionList.length > 0) {
      var last = this.first + event.rows
      if (last <= this.promotionList.length) {
        this.endIndex = event.first + event.rows
      } else {
        this.endIndex = this.promotionList.length
      }
    }
  }

  // Sorting
  onSortChange(event: any) {
    let value = event.target.value;
    if (value == 'low_to_high') {
      this.promotionList.sort((a: any, b: any) => parseFloat(a.discount) - parseFloat(b.discount));
    } else if (value == 'high_to_low') {
      this.promotionList.sort((a: any, b: any) => parseFloat(b.discount) - parseFloat(a.price));
    } else {
      this.promotionList = coupon;
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

  // View Coupen Detail
  viewDetail(promotion: any) {
    this.viewdatasidebar = true
    this.coupenDetail = this.promotionList[promotion]
  }

  /**
 * Form data get
 */
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

  //Edit
  editPromotion(promotion: any) {
    console.log(promotion);
    console.log('Form before setting values:', this.promotionForm.value);
    this.editableModel = true;
    setTimeout(() => {
      var modelTitle = document.querySelector('.modal-title') as HTMLDivElement;
      modelTitle.innerHTML = 'Update Promotion';
      var updateBtn = document.getElementById('add-btn') as HTMLDivElement;
      updateBtn.innerHTML = 'Update Promotion';
    }, 0);

    this.promotionForm.controls['id_promotion'].setValue(promotion.id_promotion)
    this.promotionForm.controls['name'].setValue(promotion.name);
    this.promotionForm.controls['startDate'].setValue(promotion.startDate);
    this.promotionForm.controls['endDate'].setValue(promotion.endDate);
    this.promotionForm.controls['discount'].setValue(promotion.discount);
    this.promotionForm.controls['status'].setValue(promotion.status);
  }


  savePromotion() {
    if (this.promotionForm.valid) {
      if (this.promotionForm.get('id_promotion')?.value) {
        const updatedPromotion = this.promotionForm.value;
        const promotionId = this.promotionForm.get('id_promotion')?.value;

        this.updatePromotion(promotionId, updatedPromotion);
      } else {
        const newPromotion = {
          name: this.promotionForm.get('name')?.value,
          startDate: this.promotionForm.get('startDate')?.value,
          endDate: this.promotionForm.get('endDate')?.value,
          discount: this.promotionForm.get('discount')?.value,
          status: this.promotionForm.get('status')?.value,
        };
        this.createPromotion(newPromotion);
      }
      this.editableModel = false;
    } else {
      this.submitted = true;
      document.getElementById('alert-error-msg')?.classList.remove('d-none');
      this.formvalidation();
    }
  }

  createPromotion(newPromotion: any): void {
    this.promotionService.createPromotion(newPromotion).subscribe({
      next: (createdPromotion: any) => {
        console.log('Promotion created:', createdPromotion);
        this.getAllPromotion();
      },
      error: (error) => {
        console.error('Error creating promotion:', error);
      },
    });
  }

  updatePromotion(promotionId: any, updatedPromotion: any): void {
    this.promotionService.updatePromotion(promotionId, updatedPromotion).subscribe({
      next: (response: any) => {
        console.log('Promotion updated:', response);
        this.getAllPromotion();
      },
      error: (error) => {
        console.error('Error updating promotion:', error);
      },
    });
  }
  formvalidation() {
    if (this.promotionForm.get('name')!.value == "") {
      var errorMsg = document.getElementById("alert-error-msg") as HTMLAreaElement
      errorMsg.innerHTML = "Please enter  title";
      return false;
    }
    if (this.promotionForm.get('startDate')!.value == "") {
      var errorMsg = document.getElementById("alert-error-msg") as HTMLAreaElement
      errorMsg.innerHTML = "Please enter a  startDate";
      return false;
    }
    if (this.promotionForm.get('endDate')!.value == "") {
      var errorMsg = document.getElementById("alert-error-msg") as HTMLAreaElement
      errorMsg.innerHTML = "Please enter a  endDate";
      return false;
    }
    if (this.promotionForm.get('discount')!.value == "") {
      var errorMsg = document.getElementById("alert-error-msg") as HTMLAreaElement
      errorMsg.innerHTML = "Please enter a  discount";
      return false;
    }
    if (this.promotionForm.get('status')!.value == "") {
      var errorMsg = document.getElementById("alert-error-msg") as HTMLAreaElement
      errorMsg.innerHTML = "Please enter a  status";
      return false;
    }
    return true;
  }

  // Delete Record
  deleteRecord() {
    this.promotionList.splice(this.removeIds, 1)
    this.promotionService.deletePromotion(this.removeIds).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.getAllPromotion()
        this.display = false;
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
    this.display = false;
  }


}













