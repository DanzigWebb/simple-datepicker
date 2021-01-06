import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatepickerComponent } from './simple-datepicker.component';
import { DatepickerDayComponent } from './datepicker-day/datepicker-day.component';
import { DatepickerGridComponent } from './datepicker-grid/datepicker-grid.component';


@NgModule({
  declarations: [
    SimpleDatepickerComponent,
    DatepickerDayComponent,
    DatepickerGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleDatepickerComponent,
    DatepickerDayComponent
  ]
})
export class SimpleDatepickerModule {
}
