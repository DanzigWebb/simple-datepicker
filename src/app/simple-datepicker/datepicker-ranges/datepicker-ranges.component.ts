import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '../simple-datepicker';

@Component({
  selector: 'app-datepicker-ranges',
  templateUrl: './datepicker-ranges.component.html',
  styleUrls: ['./datepicker-ranges.component.scss']
})
export class DatepickerRangesComponent {

  @Output() onCheckRange = new EventEmitter<DateRange>();
  @Output() toggle = new EventEmitter();

  @Input() ranges: DateRange[] = [];
  @Input() isShow = false;

  checkRangeHandle(date: DateRange) {
    this.onCheckRange.emit(date);
  }
}
