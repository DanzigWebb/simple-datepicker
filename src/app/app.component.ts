import { Component } from '@angular/core';
import { DatePickerOutput } from './simple-datepicker/simple-datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-simple-datepicker';

  lastDayChecked: Date;
  datePickerOutput: DatePickerOutput;

  onChecked(date: DatePickerOutput) {
    this.datePickerOutput = date;
  }


  onDayChecked(day: Date) {
    this.lastDayChecked = day;
  }
}
