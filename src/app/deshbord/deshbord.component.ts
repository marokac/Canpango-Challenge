import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-deshbord',
  templateUrl: './deshbord.component.html',
  styleUrls: ['./deshbord.component.css']
})
export class DeshbordComponent implements OnInit {
  name: any;
  manu = [];
  hideManu: boolean = true;
  searchBusy: boolean = false;
  manuOpen: boolean = false;
  cartData: any = { itemNum: "5", value: "My Cart" };
  public fixed: boolean = false;
  searchForm: any;

  constructor(@Inject(DOCUMENT) private doc: Document, private formBuilder: FormBuilder, ) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.doc.body.scrollTop;
    if (num > 50) {
      this.fixed = true;
    } else if (this.fixed && num < 5) {
      this.fixed = false;
    }
  }
  ngOnInit() {
    this.name = "Cedric";
    this.manu.push({ value: "surname" }, { value: "surname" }, { value: "surname" }, { value: "surname" })
    this.formBuilder = new FormBuilder();
    this.searchForm = this.formBuilder.group({
      search: new FormControl('', {}),
    })

  }
  toggleManu() {
    this.hideManu = !this.hideManu;
    this.manuOpen = !this.manuOpen;
  }
  clicItem() {
    this.hideManu = !this.hideManu;
    this.manuOpen = !this.manuOpen;
  }
  search(e) {
    if (e.target.value.trim() !== '')
      this.searchBusy = true;
    else
      this.searchBusy = false;
  }

  clearSerch() {
    this.searchForm.controls['search'].setValue('');
    this.searchBusy = false;
  }
}
