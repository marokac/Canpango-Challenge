import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  //Virables
  setupForm: any;
  pageId = 0;
  headerText: string = "Create New Category";
  addData: any;
  validationMessages:any={}

  //Event Emmitor
  @Output() addItemEvent = new EventEmitter<any>();
  //Constructor
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) { 
   //Validation massages
    this.validationMessages = {
      'name':{'required':"Please provide Category Name"},
    }
  }

  ngOnInit() {
    //Build form
    this.buildForm()
  }

//Create form
  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    })
    //subscribe to form changes
    this.setupForm.statusChanges.subscribe(data => this.doValidation());
    this.doValidation();

  }

  //value change
  onValueChanged(){
    this.doValidation();
  }

//submit the form
  submit() {
    //do validations first before submit
    this.doValidation();
    this.markAllAsDirty();

    this.formStatus.submitClicked = true;

    if (this.setupForm.valid) {
      //invoke create category service call
      this.Service.CreateCategory(this.setupForm.value).subscribe(res => {
        this.pageId = 1;
        this.headerText = "Add Items to your Category";
        this.addData = res;
        console.log(res);
      }, err => console.log(err))
    }

  }
  //handle close button click
  close() {
    this.addItemEvent.next({ id: 0 });
  }

  //form status and validation massages
  formStatus = {
    formErrors: {
      'name':'',
    },
    submitClicked: false
  };
// validate form and add validation massages
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

  // Mark fields as dirty to trigger validation
  markAllAsDirty() {
      for (const key in this.setupForm.controls) {
          this.setupForm.controls[key].markAsDirty()
      }
    this.doValidation();
  }
}
