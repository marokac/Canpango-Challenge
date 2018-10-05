import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  setupForm:any;
  DropdownOptions=[];
  pageId:any;
  @Input()data:any;
  @Output() addItemEvent=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder,private Service: BeerServiceService) { }

  ngOnInit() {
    this.pageId=0;
    this.buildForm();
   if(this.data){
    this.DropdownOptions=this.data.url;
   }
    this.Service.getBearCategories().subscribe(res=>{
     res.forEach(el => {
       this.DropdownOptions.push({url:el.url});
     });
    },err=>{
      console.log(err)
    })
  }
  keyUpEvent(){
    console.log('dd');
  }
buildForm(){
  this.formBuilder = new FormBuilder();
  this.setupForm = this.formBuilder.group({
    name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    ibu: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    calories: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    abv: new FormControl(''),
    style: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    brewery_location: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    //created_on: new FormControl('', { validators: []}),
    category: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
})
  
}

submit(){
  if(this.setupForm.valid){
  this.Service.addItems(this.setupForm.value).subscribe(res=>{
  this.pageId=1;
  console.log(res);
  },err=>console.log(err))
  }
  
}
close(){
  this.addItemEvent.next({id:1});
}
}