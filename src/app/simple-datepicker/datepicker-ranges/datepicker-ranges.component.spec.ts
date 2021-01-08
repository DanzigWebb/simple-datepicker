import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRangesComponent } from './datepicker-ranges.component';

describe('DatepickerRangesComponent', () => {
  let component: DatepickerRangesComponent;
  let fixture: ComponentFixture<DatepickerRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerRangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
