import { Component } from '@angular/core';
import { BeerServiceService } from './beer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Virable Declarations
  categories = [];
  categoriesId;
  selectedCategory: any;
  selectedItemData: any;

  //constructor method
  constructor(private Service: BeerServiceService) {
              this.categoriesId=-1;

  //Subscribing to service call
      this.Service.getBearCategories().subscribe(res => {

                          this.categoriesId=0;
                         // Build the categories data
                          this.buildcategory(res);

                          console.log(res);
                
                        },err=>{
                          // Show error panel
                              console.log(err)
                              this.categoriesId=4;
                        })

  }

  ngOnInit() {
    //this.categoriesId = 0;
  }

  // Format categories data
  buildcategory(response) {
                response.forEach(category => {
                  this.categories.push({ name: category.name, url: category.url })
                });
  }

  //View Category
  openCategory(category) {
               this.selectedCategory = category;
               this.categoriesId = 1;
              }

  //Handle events            
  viewBearDetails(e) {
    switch(e.id){
      case 0:
            this.categoriesId = 0;
            break;
      case 1:
            this.categoriesId = 1;
            break;
      case 3:
              this.selectedItemData = e.data;
              this.categoriesId = 3;
              break;
      case 5: 
              this.categoriesId = 5;
              break;
     default:{
       console.log("defauld event")
     }
     break;
      
    }
  }

//Home Button Click
  goHome(){
            this.categoriesId = 0;
          }
  //Add Item Button clicked        
  addItem(){
            this.categoriesId = 5;
          }
//Add Category Button clicked  
  addCategory(){
          this.categoriesId = 6;
        }


}
