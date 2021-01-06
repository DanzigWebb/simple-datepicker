import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatepickerComponent } from './simple-datepicker.component';



@NgModule({
  declarations: [SimpleDatepickerComponent],
  imports: [
    CommonModule
  ],
  exports: [SimpleDatepickerComponent]
})
export class SimpleDatepickerModule { }
