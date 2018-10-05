import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BeerServiceService } from '../beer-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  //input data
  @Input() data: any;
  //Event emmitor
  @Output() viewBeerEvent = new EventEmitter<any>();

  //Virabels
  beerData = [];
  beerForCatecory: any;
  pageId = -1;
  setupForm: any;

  //constractor
  constructor(private formBuilder: FormBuilder, private Service: BeerServiceService) {
    //subscribe to change
    this.sucribtionManager();
  }


  sucribtionManager() {
                      this.pageId = -1;
                      //Subscribe to change in observable stream
                      this.Service.sourceBears$.subscribe(res => {
                       // this.pageId = 0;
                        //Handle the response
                        this.buildResponse(res);
                      }, err => {
                         //Handle error
                        this.pageId = 3;
                  });
}

  ngOnInit() {
    //build form
    this.buildForm()
    //invoke get bears service call
    this.Service.getBearByCategory();
  }

  buildResponse(response) {
    //clear data
    this.beerData = [];
    console.log( response.res)
    //format response  Data
    response.res.forEach(element => {
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
                  });
          });
    //Filter by category
    this.beerForCatecory = this.beerData.filter(category => category.category == this.data.url);

    console.log(this.beerForCatecory);
    if (this.beerForCatecory && this.beerForCatecory.length == 0 && !response.isSearch) {
      //No data found for this particular Category
       this.pageId = 1;
    }
    else if (this.beerForCatecory && this.beerForCatecory.length == 0 && response.isSearch) {
      //No search resul found for this category
        this.pageId = 6;
    }
    else{
      this.pageId = 0;
    }
  }

  //View Item 
  viewItem(data) {
    //emit data to parent component
    this.viewBeerEvent.next({ data: data, id: 3 });
  }

  //saerch form
  buildForm() {
    this.formBuilder = new FormBuilder();
    this.setupForm = this.formBuilder.group({
      search: new FormControl('', { validators: [Validators.required,], updateOn: 'blur' }),
    })

  }
// form submit clicked
  submitForm() {
    if (this.setupForm.controls["search"].value !== "")
      this.Service.searchItems(this.setupForm.controls["search"].value)
    else
      this.Service.getBearByCategory();
  }

  //keup event(Search on key Up);
  onKey(e) {
    this.submitForm();
  }
  //On Value change event
  searchChange() {
    document.dispatchEvent(new Event('click'));
  }
//go to add Items
  gotoAdd(){
    this.viewBeerEvent.next({id:5});
  }

}
