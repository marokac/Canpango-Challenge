import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-view-bear',
  templateUrl: './view-bear.component.html',
  styleUrls: ['./view-bear.component.css']
})
export class ViewBearComponent implements OnInit {

  @Input() data: any;

  @Output() viewBeerEvent = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

  goHome() {
    this.viewBeerEvent.next({ id: 1 });
  }
}
