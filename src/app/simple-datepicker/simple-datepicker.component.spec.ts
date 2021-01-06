import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleDatepickerComponent } from './simple-datepicker.component';

describe('SimpleDatepickerComponent', () => {
  let component: SimpleDatepickerComponent;
  let fixture: ComponentFixture<SimpleDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
