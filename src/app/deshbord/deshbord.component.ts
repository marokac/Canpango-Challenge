import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-deshbord',
  templateUrl: './deshbord.component.html',
  styleUrls: ['./deshbord.component.css']
})
export class DeshbordComponent implements OnInit {
  name:any;
  manu=[];
  cartData:any={itemNum:"5",value:"My Cart"};
  public fixed: boolean = false; 

         constructor(@Inject(DOCUMENT) private doc: Document) {}

         @HostListener("window:scroll", [])
         onWindowScroll() {
            let num = this.doc.body.scrollTop;
            if ( num > 50 ) {
                this.fixed = true;
            }else if (this.fixed && num < 5) {
                this.fixed = false;
            }
          }
  ngOnInit() {
    this.name="Cedric";
    this.manu.push({value:"surname"},{value:"surname"},{value:"surname"},{value:"surname"})
  }

}
