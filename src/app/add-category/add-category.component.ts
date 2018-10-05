import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BeerServiceService } from '../beer-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  setupForm:any;
  pageId=0;
  headerText:string="Create New Category";
  addData:any;
  @Output() addItemEvent=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder,private Service: BeerServiceService) { }

  ngOnInit() {
    this.buildForm()
  }


  buildForm(){
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
  })
    
  }

  submit(){
    if(this.setupForm.valid){
    this.Service.CreateCategory(this.setupForm.value).subscribe(res=>{
    this.pageId=1;
    this.headerText="Add Items to your Category";
    this.addData=res;
    console.log(res);
    },err=>console.log(err))
    }
    
  }
  close(){
  this.addItemEvent.next({id:0});
  }
}
