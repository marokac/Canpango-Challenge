import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  setupForm: any;
  pageId = 0;
  headerText: string = "Create New Category";
  addData: any;
  validationMessages:any={}
  @Output() addItemEvent = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) { 

    this.validationMessages = {
      'name':{'required':"Please provide Category Name"},
    }
  }

  ngOnInit() {
    this.buildForm()
  }


  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    })

    this.setupForm.statusChanges.subscribe(data => this.doValidation());
    this.doValidation();

  }
  onValueChanged(){
    this.doValidation();
  }

  submit() {
    this.doValidation();
    this.markAllAsDirty();
    this.formStatus.submitClicked = true;
    if (this.setupForm.valid) {
      this.Service.CreateCategory(this.setupForm.value).subscribe(res => {
        this.pageId = 1;
        this.headerText = "Add Items to your Category";
        this.addData = res;
        console.log(res);
      }, err => console.log(err))
    }

  }
  close() {
    this.addItemEvent.next({ id: 0 });
  }

  formStatus = {
    formErrors: {
      'name':'',
    },
    submitClicked: false
  };

  private doValidation() {
    if (!this.setupForm) { return; } // Return if no form
    // for each field in formErrors check if associated control have errors and update formErrors with those.
    for (const field in this.formStatus.formErrors) {
      // clear previous error message (if any)
      this.formStatus.formErrors[field] = '';
      const control = this.setupForm.get(field);
      // Only set errors on controls that exist, is dirty and not valid.
      if (control && control.dirty && !control.valid) {
        if (this.validationMessages) {
          const messages = this.validationMessages[field]
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            this.formStatus.formErrors[field] += messages[key] + ' '
          }
        }
      }
    }
  }

 
  markAllAsDirty() {
      // Mark fields as dirty to trigger validation
      for (const key in this.setupForm.controls) {
          this.setupForm.controls[key].markAsDirty()
      }
    this.doValidation();
  }
}
