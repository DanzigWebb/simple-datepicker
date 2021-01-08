import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SimpleDatepickerComponent } from './simple-datepicker.component';
import { createPopper, Placement } from '@popperjs/core';
import { IDatePickerOutput } from './simple-datepicker';

@Directive({
  selector: '[appSimpleDatepicker]'
})
export class SimpleDatepickerDirective implements OnInit {

  @Output() onChecked = new EventEmitter<IDatePickerOutput>();
  @Output() onDayChecked = new EventEmitter<Date>();

  @Input() localMonth: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  @Input() localDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  @Input() weekends: number[] = [0, 6];
  @Input() firstDayOfWeek: number = 1;
  @Input() single = true;
  @Input() dateRange = false;

  @Input() placement: Placement = 'bottom';

  datepickerRef: HTMLElement;
  datepickerComp: SimpleDatepickerComponent;
  componentRef: ComponentRef<SimpleDatepickerComponent>;
  overlay: HTMLDivElement;

  datepickerValue: IDatePickerOutput;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
  }

  ngOnInit() {
    this.el.nativeElement.addEventListener('click', (e: { target: HTMLInputElement }) => {
      e.target.blur();
      this.createDatepicker();
      this.listenEvents();
    });
  }

  createDatepicker() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SimpleDatepickerComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.overlay = this.createOverlay();
    document.body.appendChild(this.overlay);
    this.overlay.appendChild(domElem);
    this.datepickerRef = domElem;
    this.datepickerComp = this.componentRef.instance;

    this.compareInputs();
    this.initPopper();

    if (this.datepickerValue?.from) {
      this.datepickerComp.updateDate.next(this.datepickerValue?.from);
    }
  }

  compareInputs() {
    this.datepickerComp.localMonth = this.localMonth;
    this.datepickerComp.localDays = this.localDays;
    this.datepickerComp.weekends = this.weekends;
    this.datepickerComp.firstDayOfWeek = this.firstDayOfWeek;
    this.datepickerComp.single = this.single;
    this.datepickerComp.dateRange = this.dateRange;
    this.datepickerComp.from = this.datepickerValue?.from;
    this.datepickerComp.to = this.datepickerValue?.to;
  }

  listenEvents() {
    this.datepickerComp.onChecked.subscribe((e: IDatePickerOutput) => {
      this.datepickerValue = e;
      this.onChecked.emit(e);
    });

    this.datepickerComp.onDayChecked.subscribe(e => {
      this.onDayChecked.emit(e);
    });

    this.datepickerComp.onClickClose.subscribe(() => {
      this.destroyDatepicker();
    });

    this.datepickerComp.onClickSubmit.subscribe(() => {
      this.destroyDatepicker();
      this.setInputValue();
    });

    this.datepickerComp.onFastDateCheck.subscribe(() => {
      this.setInputValue();
    });
  }

  setInputValue() {
    const {from, to} = this.datepickerValue;
    const createDateString = (date: Date) => (
      date && `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    );
    const fromStr = createDateString(from);
    const toStr = createDateString(to);
    this.el.nativeElement.value = this.dateRange ? `${fromStr} — ${toStr}` : `${fromStr}`;
  }

  createOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.classList.add('datepicker-overlay');
    overlay.setAttribute('style', `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 11
    `);
    overlay.addEventListener('click', e => this.destroyDatepicker(), {once: true});
    return overlay;
  }

  destroyDatepicker(): void {
    this.componentRef.destroy();
    this.overlay.remove();
  }

  initPopper(): void {
    createPopper(this.el.nativeElement, this.datepickerRef, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: ({placement, popper}) => {
              if (placement === 'bottom') {
                return [-popper.height / 2, 0];
              } else {
                return [];
              }
            }
          }
        }
      ]
    });
  }
}
