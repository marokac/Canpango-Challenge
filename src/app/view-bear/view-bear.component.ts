import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-view-bear',
  templateUrl: './view-bear.component.html',
  styleUrls: ['./view-bear.component.css']
})
export class ViewBearComponent implements OnInit {
//input data
  @Input() data: any;
//Event Emitor
  @Output() viewBeerEvent = new EventEmitter<any>()

  //Constructor
  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }
//back botton clicked
  goHome() {
    this.viewBeerEvent.next({ id: 1 });
  }
}
