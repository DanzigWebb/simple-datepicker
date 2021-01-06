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
