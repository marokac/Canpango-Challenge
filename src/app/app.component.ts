import { Component } from '@angular/core';
import { BeerServiceService } from './beer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories = [];
  categoriesId;
  selectedCategory: any;
  selectedItemData: any;
  constructor(private Service: BeerServiceService) {
    this.categoriesId=-1;
    this.Service.getBearCategories().subscribe(res => {
      this.categoriesId=0;
      this.buildcategory(res);
      console.log(res);
    },err=>{
     console.log(err)
     this.categoriesId=4;
    })

  }

  ngOnInit() {
    //this.categoriesId = 0;
  }
  buildcategory(response) {
    response.forEach(category => {
      this.categories.push({ name: category.name, url: category.url })
    });
  }

  openCategory(category) {
    this.selectedCategory = category;
    this.categoriesId = 1;
  }

  viewBearDetails(e) {
    console.log(e);
    if (e.id == 3) {
      this.selectedItemData = e.data;
      this.categoriesId = 3;
    }
    if(e.id==1){
      this.categoriesId = e.id;
    }
    if(e.id==0)
    this.categoriesId = 0;

    if(e.id==5)
    this.categoriesId = 5;
  }

  goHome(){
    this.categoriesId = 0;
  }
  addItem(){
    this.categoriesId = 5;
  }

  addCategory(){
    this.categoriesId = 6;
  }
}
