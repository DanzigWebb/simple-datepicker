import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EmbeddedViewRef, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SimpleDatepickerComponent } from './simple-datepicker.component';
import { createPopper } from '@popperjs/core';
import { DatePickerOutput } from './simple-datepicker';

@Directive({
  selector: '[appSimpleDatepicker]'
})
export class SimpleDatepickerDirective implements OnInit {

  @Output() onChecked = new EventEmitter<DatePickerOutput>();
  @Output() onDayChecked = new EventEmitter<Date>();

  @Input() localMonth: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  @Input() localDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  @Input() weekends: number[] = [0, 6];
  @Input() firstDayOfWeek: number = 1;
  @Input() single = true;
  @Input() dateRange = false;

  datepickerRef: HTMLElement;
  datepickerComp: SimpleDatepickerComponent;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
    this.loadComponent();
  }

  ngOnInit() {
    this.loadComponent();
    this.listenEvents();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SimpleDatepickerComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.datepickerRef = domElem;
    this.datepickerComp = componentRef.instance;

    this.compareInputs();
    this.initPopper();

    this.el.nativeElement.addEventListener('click', e => {
      this.datepickerComp.isOpen = true;
    });
  }

  compareInputs() {
    this.datepickerComp.localMonth = this.localMonth;
    this.datepickerComp.localDays = this.localDays;
    this.datepickerComp.weekends = this.weekends;
    this.datepickerComp.firstDayOfWeek = this.firstDayOfWeek;
    this.datepickerComp.single = this.single;
    this.datepickerComp.dateRange = this.dateRange;
  }

  listenEvents() {
    this.datepickerComp.onChecked.subscribe(e => {
      this.onChecked.emit(e);
    });
    this.datepickerComp.onDayChecked.subscribe(e => {
      this.onDayChecked.emit(e)
    });

    this.datepickerComp.onClickClose.subscribe(() => {
      this.datepickerComp.isOpen = false;
    });

    this.datepickerComp.onClickSubmit.subscribe(() => {
      this.datepickerComp.isOpen = false;
      this.el.nativeElement.value = this.datepickerComp.from?.toDateString() + this.datepickerComp.to?.toDateString()
    });
  }

  initPopper() {
    createPopper(this.el.nativeElement, this.datepickerRef, {
      placement: 'bottom-start'
    });
  }
}
