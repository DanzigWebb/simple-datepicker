export interface IDatePickerOutput {
  from: Date;
  to: Date;
}

export class DatePickerOutput implements IDatePickerOutput {
  constructor(
    public readonly from: Date,
    public readonly to: Date
  ) {
  }
}

interface IDay {
  date: Date;
  enable: boolean;
}

export class Day implements IDay {
  date: Date;
  enable: boolean;
  dayOfWeek: number;
  isToday: boolean;

  isWeekend = false;
  checked = false;
  firstDay = false;
  lastDay = false;

  constructor(params: IDay) {
    this.date = params.date;
    this.enable = params.enable;
    this.dayOfWeek = params.date.getDay();
  }

  public reset() {
    this.checked = false;
    this.firstDay = false;
    this.lastDay = false;
  }
}


export class Month {

  public readonly days: Day[];

  constructor(
    month: number,
    year: number,
    private readonly weekends = [5, 6],
    private readonly firstDay = 1
  ) {
    this.days = this.getDaysInMonth(month, year);
  }

  private getDaysInMonth(month: number, year: number): Day[] {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      const day = new Day({date: new Date(date), enable: true});
      day.isWeekend = this.weekends.includes(day.dayOfWeek);
      day.isToday = day.date.getTime() === today.getTime();
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    const firstDay = new Date(days[0].date);
    return Month.fillDays([...this.getDaysBefore(firstDay), ...days]);
  }

  private getDaysBefore(day: Date): Day[] {
    const days: Day[] = [];

    while (day.getDay() !== this.firstDay) {
      day.setDate(day.getDate() - 1);

      days.push(new Day({
        date: new Date(day),
        enable: false
      }));
    }
    return days.reverse();
  }

  private static fillDays(days: Day[]): Day[] {
    while ((days.length / 7) < 6) {
      const lastDay = days[days.length - 1].date;
      const date = new Date(lastDay);
      date.setDate(date.getDate() + 1);

      days.push(new Day({
        date,
        enable: false
      }));
    }

    return days;
  }
}


export class DateRange implements IDatePickerOutput {
  private readonly today = new Date(new Date().setHours(0, 0, 0, 0));

  public from: Date = new Date();
  public to: Date = this.today;

  constructor(
    public label: string
  ) {
  }

  setByYears(param: 'from' | 'to', years: number): DateRange {
    const clone = new Date(this[param]);
    this[param] = new Date(clone.setFullYear(clone.getFullYear() + years));
    this.correctRange();
    return this;
  }

  fromByYears = (years: number) => this.setByYears('from', years);
  toByYears = (years: number) => this.setByYears('to', years);

  setByMonths(param: 'from' | 'to', months: number): DateRange {
    const clone = new Date(this[param]);
    this[param] = new Date(clone.setMonth(clone.getMonth() + months));
    this.correctRange();
    return this;
  }

  fromByMonths = (months: number) => this.setByMonths('from', months);
  toByMonths = (months: number) => this.setByMonths('to', months);

  setByWeeks(param: 'from' | 'to', weeks: number) {
    const clone = new Date(this[param]);
    const days = weeks * 7;
    this[param] = new Date(clone.setDate(clone.getDate() + days));
    this.correctRange();
    return this;
  }

  fromByWeeks = (weeks: number) => this.setByWeeks('from', weeks);
  toByWeeks = (weeks: number) => this.setByWeeks('to', weeks);

  setByDays(param: 'from' | 'to', days: number) {
    const clone = new Date(this[param]);
    this[param] = new Date(clone.setDate(clone.getDate() + days));
    this.correctRange();
    return this;
  }

  fromByDays = (days: number) => this.setByDays('from', days);
  toByDays = (days: number) => this.setByDays('to', days);

  firstDay(param: 'from' | 'to' | 'all') {
    if (param === 'all') {
      this.from = new Date(this.from.setDate(1));
      this.to = new Date(this.to.setDate(1));
    } else {
      this[param] = new Date(this[param].setDate(1));
    }
    return this;
  }

  lastDay(param: 'from' | 'to' | 'all') {
    const toLast = (param: 'from' | 'to') =>
      this.setByMonths(param, 1)
        .firstDay(param)
        .setByDays(param, -1);

    (param === 'all')
      ? ['all', 'from'].forEach(toLast)
      : toLast(param);

    return this;
  }

  private correctRange() {
    if (this.from.getTime() > this.to.getTime()) {
      [this.from, this.to] = [this.to, this.from];
    }
  }
}

export const dateRanges: DateRange[] = [
  new DateRange('Last Week')
    .fromByWeeks(-1),

  new DateRange('Last 3 days')
    .fromByDays(-3),

  new DateRange('This Month')
    .firstDay('from')
    .lastDay('to'),

  new DateRange('Last Month')
    .firstDay('from')
    .fromByMonths(-1)
    .lastDay('to')
    .toByMonths(-1),

  new DateRange('Last 3 Month')
    .fromByMonths(-3)
    .firstDay('all')
    .toByMonths(-1)
    .lastDay('to'),

  new DateRange('Last Year')
    .fromByYears(-1)
];
