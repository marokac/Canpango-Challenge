import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBearComponent } from './view-bear.component';

describe('ViewBearComponent', () => {
  let component: ViewBearComponent;
  let fixture: ComponentFixture<ViewBearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
