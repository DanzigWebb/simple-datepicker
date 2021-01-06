import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickerGridComponent } from './datepicker-grid.component';

describe('DatepickerGridComponent', () => {
  let component: DatepickerGridComponent;
  let fixture: ComponentFixture<DatepickerGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
