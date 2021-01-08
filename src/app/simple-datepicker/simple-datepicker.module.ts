import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatepickerComponent } from './simple-datepicker.component';
import { DatepickerDayComponent } from './datepicker-day/datepicker-day.component';
import { DatepickerGridComponent } from './datepicker-grid/datepicker-grid.component';
import { SimpleDatepickerDirective } from './simple-datepicker.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SimpleDatepickerComponent,
    DatepickerDayComponent,
    DatepickerGridComponent,
    SimpleDatepickerDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SimpleDatepickerComponent,
    DatepickerDayComponent,
    SimpleDatepickerDirective
  ]
})
export class SimpleDatepickerModule {
}
