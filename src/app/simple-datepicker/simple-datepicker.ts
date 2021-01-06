interface IDay {
  date: Date;
  enable: boolean;
}

export class Day implements IDay {
  date: Date;
  enable: boolean;

  constructor(params: IDay) {
    this.date = params.date;
    this.enable = params.enable;
  }
}


export class Month {

  days: Day[];

  constructor(month: number, year: number) {
    this.days = Month.getDaysInMonth(month, year);
  }

  private static getDaysInMonth(month: number, year: number): Day[] {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      const day = new Day({date: new Date(date), enable: true});
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
