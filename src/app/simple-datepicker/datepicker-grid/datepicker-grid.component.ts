import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day, Month } from '../simple-datepicker';

@Component({
  selector: 'app-datepicker-grid',
  templateUrl: './datepicker-grid.component.html',
  styleUrls: ['./datepicker-grid.component.scss']
})
export class DatepickerGridComponent implements OnInit {

  @Output() dayChecked = new EventEmitter<Day>();

  @Input() month: Month;
  @Input() monthLabel: string;
  @Input() localDays: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
