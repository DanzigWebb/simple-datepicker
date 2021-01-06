import { Component, Input, OnInit } from '@angular/core';
import { Month } from '../simple-datepicker';

@Component({
  selector: 'app-datepicker-grid',
  templateUrl: './datepicker-grid.component.html',
  styleUrls: ['./datepicker-grid.component.scss']
})
export class DatepickerGridComponent implements OnInit {

  @Input() month: Month;
  @Input() currentMonth: string;
  @Input() localDays: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
