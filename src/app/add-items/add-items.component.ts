import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  // Virables
  setupForm: any;
  DropdownOptions = [];
  validationMessages: object = {};
  pageId: any;

  //Input data
  @Input() data: any;
  //EventEmitter
  @Output() addItemEvent = new EventEmitter<any>();

//constractor
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) { 
//Validation massages
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
           
           //Get Dropdown data from the server
            this.Service.getBearCategories().subscribe(res => {
                                                  res.forEach(el => {
                                                    //add data in to the dropdown list
                                                    this.DropdownOptions.push({ url: el.url });
                                                  });
                                            },
                                         err => {
                                                  console.log(err)
                                          });
  }


  keyUpEvent() {
    console.log('dd');
  }

  //Create add Item form
  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
      ibu: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      calories: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      abv: new FormControl('', { validators: [Validators.required,this.validateNumber()], updateOn: 'blur' }),
      style: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
      brewery_location: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      category: new FormControl(this.data? this.data.url:'', { validators: [Validators.required], updateOn: 'blur' }),
    });
    this.setupForm.statusChanges.subscribe(data => this.doValidation());
    this.doValidation();

  }

  //valueChage Event
  onValueChanged(){
    this.doValidation();
  }


  submit() {
    console.log(this.setupForm,this.formStatus);
    //do validations
    this.doValidation();
    this.markAllAsDirty();
    this.formStatus.submitClicked = true;

    if (this.setupForm.valid) {
      //invoke add Items service call
      this.Service.addItems(this.setupForm.value).subscribe(res => {
        this.pageId = 1;
        console.log(res);
      }, err => console.log(err))
    }

  }
  //close utton clicked
  close() {
    //emit event to parent component
    this.addItemEvent.next({ id: 1 });
  }

  //form status objects
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

  //Validate the form
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

 // mark form as Dirty
  markAllAsDirty() {
      // Mark fields as dirty to trigger validation
      for (const key in this.setupForm.controls) {
          this.setupForm.controls[key].markAsDirty()
      }
      //do validation
    this.doValidation();
  }

  //validate numbers
  validateNumber() {
    return (control: AbstractControl) => {
      const number = control.value; 
      if ( number.length>2) {
        return { maxlength: false }
      }
    }
}
}
