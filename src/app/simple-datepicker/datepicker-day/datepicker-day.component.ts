import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from '../simple-datepicker';

@Component({
  selector: 'app-datepicker-day',
  templateUrl: './datepicker-day.component.html',
  styleUrls: ['./datepicker-day.component.scss']
})
export class DatepickerDayComponent implements OnInit {

  @Output() dayChecked = new EventEmitter<Day>();

  @Input() day: Day;
  @Input() weekends = ['Сб', 'Вс'];
  @Input() isRange = false;

  public isToday: boolean;
  public isWeekend: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  checkDay(): void {
    this.dayChecked.emit(this.day);
  }

}
