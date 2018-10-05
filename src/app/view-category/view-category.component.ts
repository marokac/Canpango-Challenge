import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BeerServiceService } from '../beer-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  @Input() data: any;
  @Output() viewBeerEvent = new EventEmitter<any>();
  beerData = [];
  beerForCatecory: any;
  pageId = -1;
  userIsSerching: any;
  setupForm: any;
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) {
    this.sucribtionManager();
  }

  sucribtionManager() {
    this.pageId = -1;
    this.Service.sourceBears$.subscribe(res => {
      this.pageId = 0;
      this.buildResponse(res);
    }, err => {
      this.pageId = 3;
    })

  }
  ngOnInit() {
    this.buildForm()
    this.Service.getBearByCategory();
  }

  buildResponse(res) {

    this.beerData = [];

    console.log(this.beerData)

    res.forEach(element => {
      this.beerData.push({
        abv: element.abv,
        brewery_location: element.brewery_location,
        calories: element.calories,
        category: element.category,
        created_on: element.created_on,
        ibu: element.ibu,
        name: element.name,
        style: element.style,
        url: element.url
      })

    });
    this.beerForCatecory = this.beerData.filter(category => category.category == this.data.url);

    console.log(this.beerForCatecory);
    if (this.beerForCatecory && this.beerForCatecory.length == 0 && !this.userIsSerching) {
      this.pageId = 1;
    }
    else if (this.beerForCatecory && this.beerForCatecory.length == 0 && this.userIsSerching) {
      this.pageId = 6;
    }
  }

  viewItem(data) {
    this.viewBeerEvent.next({ data: data, id: 3 });
  }

  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      search: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    })

  }

  submitForm() {
    if (this.setupForm.controls["search"].value !== "")
      this.Service.searchItems(this.setupForm.controls["search"].value)
    else
      this.Service.getBearByCategory();
  }

  onKey(e) {
    this.userIsSerching = true;
    this.submitForm();
  }
  searchChange() {
    this.userIsSerching = true;
    document.dispatchEvent(new Event('click'));
  }

  gotoAdd(){
    this.viewBeerEvent.next({id:5});
  }

}
