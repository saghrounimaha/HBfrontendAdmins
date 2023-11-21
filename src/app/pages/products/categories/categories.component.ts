import { Component, Renderer2 } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { Category } from 'src/app/models/category.model';
import { CategoryserviceService } from 'src/app/service/categoryservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categoryForm!: UntypedFormGroup;
  category: Category = {
    name: '',
    description: '',
    image: null
    };
  categories:any [] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  removeIds: any;
  submitted!: boolean;
  display!: boolean;
  location: any;

  constructor(private router: Router,private formBuilder: UntypedFormBuilder, private categoryService: CategoryserviceService,private renderer: Renderer2) {

  }

  ngOnInit(): void {

    this.getAllCategories()
    this.categoryForm = this.formBuilder.group({
      id_category: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null,Validators.required],
    });

      }


  // show dialog
  showDialog(id: any) {
    this.removeIds = id
    this.display = true;
  }

  /**
* Form data get
*/
getAllCategories() {
  this.categoryService.getAllCategories().subscribe({
    next: (response: any) => {
      this.categories = response;
      this.filteredCategories = [...this.categories];
      console.log(response);
    },
    error: (error) => {
      console.error('Error fetching categories:', error);
    },
  });
}


  first: number = 0;
  rows: number = 10;
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }


  deleteRecord() {
    console.log(this.removeIds);

    if (this.removeIds) {
      this.categoryService.deleteCategory(this.removeIds).subscribe({
        next: (response) => {
          console.log('Category deleted successfully:', response);
          this.getAllCategories();
          this.display = false;
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }

    this.display = false;

  }
  // File Upload





  // Edit Data
  editData(category: any) {
    this.submitted = false;
    if (category && this.categoryForm) {
      console.log('image:', category.image);
      console.log('Image URL:',category.image.url);

      this.categoryForm.patchValue({
        id_category: category.id_category,
        name: category.name,
        description: category.description,
      });

      const imgElement = document.getElementById('category-img') as HTMLImageElement;
      if (imgElement ) {
        console.log('Setting Image:', category.image.url);
        imgElement.src = category.image.url;
      }
    }
  }

  updateCategory(categoryId: number, updatedCategory: any): void {
    const formData = new FormData();
    formData.append('name', updatedCategory.name);
    formData.append('description', updatedCategory.description);
    formData.append('newImage', updatedCategory.image);

    this.categoryService.updateCategory(categoryId, formData).subscribe({
      next: (response) => {
        console.log('Category updated successfully:', response);
        this.getAllCategories();
      },
      error: (error) => {
        console.error('Error updating category:', error);
      },
    });
  }


  saveCategory() {
    this.submitted = true;
    document.getElementById('alert-error-msg')?.classList.remove('d-none');

    if (this.categoryForm.valid) {
      const categoryId = this.categoryForm.get('id_category')?.value;
      console.log('id_category:', categoryId);

      if (categoryId) {
        const updatedCategory = { ...this.categoryForm.value };
        this.updateCategory(categoryId, updatedCategory);
      } else {
        this.createCategory();
      }
    }else{
      this.submitted = true
      document.getElementById('alert-error-msg')?.classList.remove('d-none')    }
  }


  image: File | null = null;
  fileChange(event: any): void {
    this.image = event.target.files[0];

    if (this.image) {
      const reader = new FileReader();

      reader.onload = () => {
        const imgElement = document.getElementById('category-img') as HTMLImageElement;

        if (imgElement && this.image) {
          this.renderer.setAttribute(imgElement, 'src', URL.createObjectURL(this.image));
        }

        this.categoryForm.patchValue({
          image: this.image,
        });
      };

      reader.readAsDataURL(this.image);
      console.log(event);
    }
  }

  createCategory(): void {
    if (this.categoryForm.invalid || !this.image) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description);
    formData.append('image', this.image);

    console.log(formData);

    this.categoryService.createCategory(formData).subscribe({
      next: (response: any) => {
        console.log('Category created successfully:', response);
        this.categoryForm.reset();
        this.image = null;
        this.getAllCategories();
      },
      error: (error) => {
        console.error('Error creating category:', error);
      },
    });
  }




  filterCategories() {
    if (this.searchTerm.trim() === '') {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter(categories =>
        categories.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
