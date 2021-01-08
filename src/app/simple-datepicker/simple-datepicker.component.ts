import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePickerOutput, DateRange, dateRanges, Day, IDatePickerOutput, Month } from './simple-datepicker';
import { BehaviorSubject } from 'rxjs';
import { delay, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-simple-datepicker',
  templateUrl: './simple-datepicker.component.html',
  styleUrls: ['./simple-datepicker.component.scss']
})
export class SimpleDatepickerComponent implements OnInit {

  @Output() onChecked = new EventEmitter<IDatePickerOutput>();
  @Output() onDayChecked = new EventEmitter<Date>();

  @Output() onClickClose = new EventEmitter();
  @Output() onClickSubmit = new EventEmitter();
  @Output() onFastDateCheck = new EventEmitter();

  @Input() localMonth: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  @Input() localDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  @Input() dateRanges: DateRange[] = dateRanges;
  @Input() weekends: number[] = [0, 6];
  @Input() firstDayOfWeek: number = 1;
  @Input() single = true;
  @Input() dateRange = false;

  updateDate = new BehaviorSubject<Date>(new Date());

  public dateRangeShow = true;
  public month: Month;
  public nextMonth: Month;

  public currentMonthLabel: string;
  public nextMonthLabel: string;
  public today = new Date(new Date().setHours(0, 0, 0, 0));

  get isCanSubmit() {
    if (this.dateRange) {
      return this.from && this.to;
    } else {
      return this.from;
    }
  };

  get currentMonthIndex() {
    return this._currentMonthIndex;
  }

  set currentMonthIndex(index) {
    index = Number(index);
    this.currentMonthLabel = this.localMonth[index];
    this._currentMonthIndex = index;
  }

  private _currentMonthIndex: number;

  private _date: Date;

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = new Date(newDate);
    this.createCurrentMonth();
    this.createNextMonth();
    this.checkRangeDays();
  }

  ngOnInit(): void {
    this.date = new Date();

    this.updateDate.pipe(
      delay(50),
      distinctUntilChanged((prev, next) => prev.getTime() === next.getTime())
    ).subscribe(date => {
      this.date = new Date(date);
    });
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

  createCurrentMonth(): void {
    this.currentMonthIndex = this.date.getMonth();
    this.currentMonthLabel = this.localMonth[this.currentMonthIndex];
    this.month = this.createMonth(this.currentMonthIndex, this.date.getFullYear());
  }

  createNextMonth(): void {
    const nextDate = new Date(this.date.getTime());
    nextDate.setMonth(nextDate.getMonth() + 1);
    const nextMonthIndex = nextDate.getMonth();
    this.nextMonthLabel = this.localMonth[nextMonthIndex];
    this.nextMonth = this.createMonth(nextMonthIndex, nextDate.getFullYear());
  }

  onSelectMonth(event: { target: HTMLSelectElement }): void {
    const monthIndex = +event.target.value;
    this.date = new Date(this.date.setMonth(monthIndex));
  }

  public from: Date = null;
  public to: Date = null;

  dayCheckedHandle(day: Day): void {
    this.dateRangeShow = false;

    if (!this.dateRange) {
      this.resetCheckedMonth();
      day.checked = true;
      this.from = new Date(day.date);
      this.onCheckedEmit();
      return;
    }

    if (this.from && this.to) {
      this.resetCheckedMonth();
      this.from = new Date(day.date);
      day.checked = true;
      day.firstDay = true;
      this.onCheckedEmit();
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

    this.onDayChecked.emit(new Date(day?.date));
    this.onCheckedEmit();
  }

  private onCheckedEmit() {
    this.onChecked.emit(
      new DatePickerOutput(this.from, this.to)
    );
  }

  private resetCheckedMonth(): void {
    this.resetFromAndTo();
    const resetChecked = (day: Day) => day.reset();
    this.month.days.forEach(resetChecked);
    this.nextMonth.days.forEach(resetChecked);
  }

  private isMore = (day: Day) => day.date.getTime() >= this.from?.getTime();
  private isLess = (day: Day) => day.date.getTime() <= this.to?.getTime();

  private checkRangeDays(): void {
    let {from, to} = this;
    from = new Date(from?.setHours(0, 0, 0, 0));
    to = new Date(to?.setHours(0, 0, 0, 0));

    const checkDays = (day: Day) => {
      if (this.isMore(day) && this.isLess(day)) {
        day.checked = true;
        day.firstDay = day.date.getTime() === from.getTime();
        day.lastDay = day.date.getTime() === to.getTime();
      }
    };

    const checkFromDay = (day: Day) => {
      if (day.date.getTime() === from.getTime()) {
        day.checked = true;
        day.firstDay = true;
        if (this.dateRange) {
        }
      }
    };

    if (from && !to) {
      this.month.days.forEach(checkFromDay);
      this.nextMonth.days.forEach(checkFromDay);
    }

    if (from && to) {
      this.month.days.forEach(checkDays);
      this.nextMonth.days.forEach(checkDays);
    }
  }

  setDateRange({from, to}: DateRange) {
    this.dateRangeShow = false;

    this.from = from;
    this.to = to;
    this.date = new Date(from);
    this.onCheckedEmit();
    this.onFastDateCheck.emit();
  }

  showFromDate() {
    this.date = new Date(this.from);
  }

  showToDate() {
    this.date = new Date(this.to);
  }


  private resetFromAndTo(): void {
    this.from = null;
    this.to = null;
  }
}
