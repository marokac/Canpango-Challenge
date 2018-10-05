import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  setupForm: any;
  DropdownOptions = [];
  validationMessages: object = {};
  pageId: any;
  @Input() data: any;
  @Output() addItemEvent = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) { 

    this.validationMessages = {
      'name':{'required':"Item name is required"},
      'ibu':{'required':"Ibu number is required",'maxlength':"leng"},
      'calories': {'required':"calories number is Required",'maxlength':"leng"},
      'abv': {'required':"abv number is required",'maxlength':"leng"},
      'style': {'required':"Style is required"},
      'brewery_location':{'required':"Brewery Location is required"},
      'category':{'required':"Category must be selected"}
    }
  }

  ngOnInit() {
    this.pageId = 0;
    this.buildForm();
    if (this.data) {
      this.DropdownOptions = this.data.url;
    }
    this.Service.getBearCategories().subscribe(res => {
      res.forEach(el => {
        this.DropdownOptions.push({ url: el.url });
      });
    }, err => {
      console.log(err)
    })
  }
  keyUpEvent() {
    console.log('dd');
  }
  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
      ibu: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      calories: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      abv: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      style: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
      brewery_location: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      category: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    });
    this.setupForm.statusChanges.subscribe(data => this.doValidation());
    this.doValidation();

  }
  onValueChanged(){
    this.doValidation();
  }
  submit() {
    console.log(this.setupForm,this.formStatus);
    this.doValidation();
    this.markAllAsDirty()
    this.formStatus.submitClicked = true;
    if (this.setupForm.valid) {
      this.Service.addItems(this.setupForm.value).subscribe(res => {
        this.pageId = 1;
        console.log(res);
      }, err => console.log(err))
    }

  }
  close() {
    this.addItemEvent.next({ id: 1 });
  }


  formStatus = {
    formErrors: {
      'name':'',
      'ibu':'',
      'calories': '',
      'abv': '',
      'style': '',
      'brewery_location':'',
      'category':''
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

  validateNumber() {
    return (control: AbstractControl) => {
      const number = control.value; 
      if ( number.length>2) {
        return { maxlength: false }
      }
    }
}
}
