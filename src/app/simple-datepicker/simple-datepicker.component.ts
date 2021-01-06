import { Component, Input, OnInit } from '@angular/core';
import { Month } from './simple-datepicker';

@Component({
  selector: 'app-simple-datepicker',
  templateUrl: './simple-datepicker.component.html',
  styleUrls: ['./simple-datepicker.component.scss']
})
export class SimpleDatepickerComponent implements OnInit {

  @Input() localMonth: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  @Input() localDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  @Input() weekends: number[] = [5, 6];

  public currentMonth: string;
  public today = new Date(new Date().setHours(0, 0, 0, 0));

  private _date: Date;

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = new Date(newDate);
    const monthIndex = this.date.getMonth();
    this.currentMonth = this.localMonth[monthIndex];
    this.month = new Month(monthIndex, this.date.getFullYear(), this.weekends);
  }

  month: Month;

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date();
  }

}
