import { Component, Input, OnInit } from '@angular/core';
import { Day, Month } from './simple-datepicker';

@Component({
  selector: 'app-simple-datepicker',
  templateUrl: './simple-datepicker.component.html',
  styleUrls: ['./simple-datepicker.component.scss']
})
export class SimpleDatepickerComponent implements OnInit {

  @Input() localMonth: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  @Input() localDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  @Input() weekends: number[] = [0, 6];
  @Input() firstDayOfWeek: number = 1;

  @Input() dateRange = false;

  public month: Month;
  public nextMonth: Month;

  public currentMonthLabel: string;
  public nextMonthLabel: string;
  public today = new Date(new Date().setHours(0, 0, 0, 0));

  private _date: Date;

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = new Date(newDate);
    this.createCurrentMonth();
    this.createNextMonth();
  }

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date();
  }

  setPrevMonth(): void {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
  }

  setNextMonth(): void {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
  }

  setTodayMonth(): void {
    this.date = new Date();
  }

  createMonth = (month: number, year: number): Month => (
    new Month(month, year, this.weekends, this.firstDayOfWeek)
  );

  createCurrentMonth() {
    const monthIndex = this.date.getMonth();
    this.currentMonthLabel = this.localMonth[monthIndex];
    this.month = this.createMonth(monthIndex, this.date.getFullYear());
  }

  createNextMonth() {
    const nextDate = new Date(this.date.getTime());
    nextDate.setMonth(nextDate.getMonth() + 1);
    const nextMonthIndex = nextDate.getMonth();
    this.nextMonthLabel = this.localMonth[nextMonthIndex];
    this.nextMonth = this.createMonth(nextMonthIndex, nextDate.getFullYear());
  }

  public from: Date = null;
  public to: Date = null;

  onChecked(day: Day): void {
    if (!this.dateRange) {
      this.resetCheckedMonth();
      day.checked = true;
      this.from = new Date(day.date);
      return;
    }

    if (this.from && this.to) {
      this.resetCheckedMonth();
      this.from = new Date(day.date);
      day.checked = true;
      day.firstDay = true;
      return;
    }

    if (!this.from) {
      this.from = new Date(day.date);
      day.checked = true;
      day.firstDay = true;
    }

    if (!this.to && (day.date.getTime() < this.from.getTime())) {
      this.resetCheckedMonth();
      this.from = new Date(day.date);
      day.firstDay = true;
      day.checked = true;
    }

    if (this.from && !this.to && (day.date.getTime() > this.from.getTime())) {
      this.to = new Date(day.date);
      day.checked = true;
      day.lastDay = true;
      this.checkRangeDays();
    }

    console.log('from: ', this.from?.toLocaleString(), 'to: ', this.to?.toLocaleString());
  }

  private resetCheckedMonth(): void {
    this.resetFromAndTo();
    const resetChecked = (day: Day) => day.reset();
    this.month.days.forEach(resetChecked);
    this.nextMonth.days.forEach(resetChecked);
  }

  private checkRangeDays(): void {
    const isMore = (day: Day) => day.date.getTime() >= this.from.getTime();
    const isLess = (day: Day) => day.date.getTime() <= this.to.getTime();
    const checkDay = (day: Day) => {
      if (isMore(day) && isLess(day)) {
        day.checked = true;
      }
    };

    this.month.days.forEach(checkDay);
    this.nextMonth.days.forEach(checkDay);
  }

  private resetFromAndTo() {
    this.from = null;
    this.to = null;
  }
}
