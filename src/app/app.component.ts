import { Component, OnInit } from '@angular/core';
import { DatePickerOutput } from './simple-datepicker/simple-datepicker';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ngx-simple-datepicker';

  lastDayChecked: Date;
  datePickerOutput: DatePickerOutput;

  isShow = false;

  ngOnInit() {
    // const popcorn = document.querySelector('#input');
    // const tooltip: HTMLElement = document.querySelector('#picker');
    //
    // createPopper(popcorn, tooltip, {
    //   placement: 'bottom-start',
    // });
  }

  onChecked(date: DatePickerOutput) {
    this.datePickerOutput = date;
  }


  onDayChecked(day: Date) {
    this.lastDayChecked = day;
  }
}
