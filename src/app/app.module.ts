import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BeerServiceService } from './beer-service.service';
import { HttpModule,Http } from '@angular/http';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { ViewBearComponent } from './view-bear/view-bear.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DeshbordComponent } from './deshbord/deshbord.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewCategoryComponent,
    ViewBearComponent,
    AddItemsComponent,
    AddCategoryComponent,
    DeshbordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [BeerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
