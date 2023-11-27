import { Variation } from 'src/app/models/variation.model';
import { VariationService } from 'src/app/service/variation.service';
import { NgApexchartsModule } from 'ng-apexcharts';

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { VariationOptionService } from 'src/app/service/variation-option.service';
import { VariationOption } from 'src/app/models/varaitionoption.model';

// Data Get

@Component({
  selector: 'app-variationOption',
  templateUrl: './variationOption.component.html',
  styleUrls: ['./variationOption.component.scss']
})
export class VariationOptionComponent {
  variationForm!: UntypedFormGroup;

  Variations:any [] = [];
  VariationList:any [] = [];
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

  constructor(private formBuilder: UntypedFormBuilder, private variationOptionService: VariationOptionService,
    private variationService:VariationService) { }

  ngOnInit(): void {

    this.getAllVariationOption()
    this.getAllVariations()



    /**
     * Form Validation
     */
    this.variationForm = this.formBuilder.group({
       id: [''],
      name: ['', [Validators.required]],
      value: ['', [Validators.required]],

    });

  }
  /**
* Form data get
*/
getAllVariationOption(){
  return  this.variationOptionService.getAllVarition().subscribe(
    (response :any) => {
      this.Variations = response;
      this.filteredVariations = response;
      console.log(response)
    },
    (error) => {
      console.error('Error fetching variations:', error);
    }
  );

}
getAllVariations() {
  return this.variationService.getAllVarition().subscribe({
    next: (response: any) => {
      this.VariationList = response;
      console.log('Variations fetched successfully:', response);
    },
    error: (error) => {
      console.error('Error fetching variations:', error);
    },
  });
}


editData(index: any) {
  var modelTitle = document.getElementById('addCategoryLabel') as HTMLAreaElement;
  modelTitle.innerHTML = 'Create VariationOption';
  var updateBtn = document.getElementById('addNewCategory') as HTMLAreaElement;
  updateBtn.innerHTML = 'Create VariationOption';


  const selectedVariation = this.Variations[index];

  if (selectedVariation) {
    this.variationForm.patchValue({
      id: selectedVariation.id,
      name: selectedVariation.variation ? selectedVariation.variation.id : null,
      value: selectedVariation.value,
    });
  } else {
    console.error('Selected Variation is null.');
  }
}




saveVariation() {
  if (this.variationForm.valid) {
    if (this.variationForm.get('id')?.value) {
      const id = this.variationForm.get('id')?.value;
      const updatedVariation: VariationOption = {
        id: this.variationForm.value.id,
        value: this.variationForm.value.value,
        variation: {
          id: this.variationForm.value.name,
          name: '',
        },
      };

      this.updateVariation(id, updatedVariation);
    } else {
      const newVariationOption = {
        value: this.variationForm.value.value,
        variation: {
          id: this.variationForm.value.name,
        },
      };
      console.log(newVariationOption);
      this.createVariation(newVariationOption);
    }
  } else {
    this.submitted = true;
    document.getElementById('alert-error-msg')?.classList.remove('d-none');
  }
}



createVariation(variationoption:any): void {
  this.variationOptionService.createVariation(variationoption).subscribe(
    (createdVariation:any) => {
      console.log('Variation created:', createdVariation);
      this.getAllVariationOption()
    },
    (error) => {
      console.error('Error creating variation:', error);
    }
  );
}


updateVariation(id: number, updatedVariation: VariationOption): void {
  this.variationOptionService.updateVariation(id, updatedVariation).subscribe(
    (response: any) => {
      console.log('Variation updated:', response);
      this.variationForm.reset();
      this.getAllVariationOption()
      this.getAllVariationOption()

    },
    (error) => {
      console.error('Error updating variation:', error);
    }
  );
}

  // Delete Record
  deleteRecord() {
    if (this.removeIds) {
      this.variationOptionService.deleteVarition(this.removeIds).subscribe(
        (response) => {
          console.log('Category deleted successfully:', response);
          this.getAllVariationOption()
          this.display = false;
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }    this.display = false;
  }


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
        variation.value.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
