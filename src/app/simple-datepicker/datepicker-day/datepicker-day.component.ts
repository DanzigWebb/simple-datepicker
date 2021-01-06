import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../simple-datepicker';

@Component({
  selector: 'app-datepicker-day',
  templateUrl: './datepicker-day.component.html',
  styleUrls: ['./datepicker-day.component.scss']
})
export class DatepickerDayComponent implements OnInit {

  @Input() day: Day;
  @Input() weekends = ['Сб', 'Вс'];

  public isToday: boolean;
  public isWeekend: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.checkDay()
  }

  checkDay(): void {
  }

}
