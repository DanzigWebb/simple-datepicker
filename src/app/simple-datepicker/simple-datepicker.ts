interface IDay {
  date: Date;
  enable: boolean;
  dayOfWeek?: number;
  isWeekend?: boolean;
  isToday?: boolean;
}

export class Day implements IDay {
  date: Date;
  enable: boolean;
  dayOfWeek: number;
  isWeekend = false;
  isToday: boolean;

  constructor(params: IDay) {
    this.date = params.date;
    this.enable = params.enable;
    this.dayOfWeek = params.date.getDay();
  }
}


export class Month {

  days: Day[];
  weekends: number[];

  constructor(month: number, year: number, weekends = [5, 6]) {
    this.weekends = weekends;
    this.days = Month.getDaysInMonth(month, year, weekends);
  }

  private static getDaysInMonth(month: number, year: number, weekends = [5, 6]): Day[] {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      const day = new Day({date: new Date(date), enable: true});
      day.isWeekend = weekends.includes(day.dayOfWeek);
      day.isToday = day.date.getTime() === today.getTime();
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    const firstDay = new Date(days[0].date);
    return Month.fillDays([...Month.getDaysBefore(firstDay), ...days]);
  }

  private static getDaysBefore(day: Date): Day[] {
    const days: Day[] = [];

    while (day.getDay() !== 0) {
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
