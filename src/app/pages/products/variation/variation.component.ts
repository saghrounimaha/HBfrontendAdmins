import { NgApexchartsModule } from 'ng-apexcharts';

import { Variation } from './../../../models/variation.model';
import { VariationService } from 'src/app/service/variation.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.scss']
})
export class VariationComponent {
  variationForm!: UntypedFormGroup;
  variation: Variation = {
    name: '',
    };
  Variations:any [] = [];
  filteredVariations: any[] = [];
  searchTerm: string = '';
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  subcategories: any;
  submitted = false;
  econtent?: any;
  first: number = 1;
  endIndex: number = 10;
  removeIds: any;
  display!: boolean;

  constructor(private formBuilder: UntypedFormBuilder, private variationService: VariationService) { }

  ngOnInit(): void {

    this.getAllVariations()

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Products' },
      { label: 'Variation', active: true }
    ];

    /**
     * Form Validation
     */
    this.variationForm = this.formBuilder.group({
       id: [''],
      name: ['', [Validators.required]],
    });

  }
  /**
* Form data get
*/
getAllVariations() {
  return this.variationService.getAllVarition().subscribe({
    next: (response: any) => {
      this.Variations = response;
      this.filteredVariations = response;
      console.log('Variations fetched successfully:', response);
    },
    error: (error) => {
      console.error('Error fetching variations:', error);
    },
  });
}


editData(index: any) {

  var modelTitle = document.getElementById('addCategoryLabel') as HTMLAreaElement;
  modelTitle.innerHTML = 'Edit Variation';
  var updateBtn = document.getElementById('addNewCategory') as HTMLAreaElement;
  updateBtn.innerHTML = 'Save Variation';

  const selectedVariation = this.Variations[index]; // Assuming Variations is an array of variations
  this.variationForm.controls['id'].setValue(selectedVariation.id);
  this.variationForm.controls['name'].setValue(selectedVariation.name);
}

saveVariation() {
  if (this.variationForm.valid) {
    if (this.variationForm.get('id')?.value) {
      const id = this.variationForm.get('id')?.value;
      const updatedVariation: Variation = this.variationForm.value;
      this.updateVariation(id, updatedVariation);
    } else {
      const newVariation= {
        name:this.variationForm.value.name
      }
      this.createVariation(newVariation);
    }
  } else {
    this.submitted = true
    document.getElementById('alert-error-msg')?.classList.remove('d-none')
  }
}

createVariation(variation: any): void {
  this.variationService.createVariation(variation).subscribe({
    next: (createdVariation: any) => {
      console.log('Variation created:', createdVariation);
      this.getAllVariations();
    },
    error: (error) => {
      console.error('Error creating variation:', error);
    },
  });
}

updateVariation(id: number, updatedVariation: Variation): void {
  this.variationService.updateVariation(id, updatedVariation).subscribe({
    next: (response: any) => {
      console.log('Variation updated:', response);
      this.getAllVariations()
    },
    error: (error) => {
      console.error('Error updating variation:', error);
    },
  });
}


  // Delete Record
  deleteRecord() {
    if (this.removeIds) {
      this.variationService.deleteVarition(this.removeIds).subscribe({
        next: (response) => {
          console.log('Category deleted successfully:', response);
          this.getAllVariations();
          this.display = false;
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
     this.display = false;
  }

  // Pagination
  // onPageChange(event: any) {
  //   this.first = event.first + 1;
  //   if (this.subcategories.length > 0) {
  //     var last = this.first + event.rows
  //     if (last <= this.subcategories.length) {
  //       this.endIndex = event.first + event.rows
  //     } else {
  //       this.endIndex = this.subcategories.length
  //     }
  //   }
  // }
  onPageChange(event: any) {
    this.first = event.first + 1;
    if (this.Variations.length > 0) {
      const last = this.first + event.rows;
      this.endIndex = Math.min(last, this.Variations.length);
    }
  }
  // delete
  showDialog(id: any) {
    this.removeIds = id
    this.display = true;
  }

  filterVariations() {
    if (this.searchTerm.trim() === '') {
      this.filteredVariations = [...this.Variations];
    } else {
      this.filteredVariations = this.Variations.filter(variation =>
        variation.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
