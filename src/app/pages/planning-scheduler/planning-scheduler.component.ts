import {
  ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  DxCalendarModule,
  DxButtonModule,
  DxTooltipComponent,
  DxTooltipModule,
  DxSchedulerModule,
  DxSchedulerComponent,
  DxSpeedDialActionModule,
} from "devextreme-angular";
import { DxSchedulerTypes } from 'devextreme-angular/ui/scheduler'

import { Task } from 'src/app/types/task';
import { DataService, ScreenService } from 'src/app/services';
import { CalendarListComponent } from 'src/app/components/utils/calendar-list/calendar-list.component';
import { LeftSidePanelComponent } from 'src/app/components/utils/left-side-panel/left-side-panel.component';
import { RightSidePanelComponent } from 'src/app/components/utils/right-side-panel/right-side-panel.component';
import { AgendaItem, AgendaComponent } from "../../components/utils/agenda/agenda.component";
import { ApplyPipeDirective } from '../../pipes/apply.pipe';
import { SchedulerTooltipComponent } from '../../components/library/scheduler-tooltip/scheduler-tooltip.component';

type SelectedAppointment = { data: Record<string, any>, target: any };

@Component({
  templateUrl: './planning-scheduler.component.html',
  styleUrls: ['./planning-scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
  imports: [
    ApplyPipeDirective,
    DxCalendarModule,
    DxButtonModule,
    DxSchedulerModule,
    DxSpeedDialActionModule,
    DxTooltipModule,
    AsyncPipe,
    DatePipe,
    CalendarListComponent,
    LeftSidePanelComponent,
    RightSidePanelComponent,
    AgendaComponent,
    SchedulerTooltipComponent,
  ]
})
export class PlanningSchedulerComponent implements OnInit {
  @ViewChild('schedulerRef', { static: false }) schedulerRef: DxSchedulerComponent;

  @ViewChild('tooltipRef', { static: false }) tooltipRef: DxTooltipComponent;

  private service = inject(DataService);

  protected screen = inject(ScreenService);

  tasks = signal<DataSource<Task>>(new DataSource([]));

  currentDate = signal(new Date());

  currentView = signal<DxSchedulerTypes.ViewType>('workWeek');

  isRightPanelOpen = signal(false);

  listDataSource = signal<unknown[]>([]);

  resourcesList = signal<Record<string, unknown>[]>([]);

  selectedAppointment = signal<SelectedAppointment>(null);

  agendaItems = signal<AgendaItem[]>([]);

  isXSmall = signal(this.screen.sizes['screen-small']);

  schedulerCurrentDate = signal<Date>(new Date());

  constructor() {
    this.service.getDefaultListDS().subscribe(
      (data) => {
        this.listDataSource.set(data);
        this.resourcesList.set(data.reduce((res: Record<string,any>[], calendarList) => res.concat(calendarList.items), []));
      });

    this.screen.screenChanged.subscribe(({isXSmall}) => {
      this.isXSmall.set(isXSmall);
      this.repaintScheduler();
    });
  }

  ngOnInit(): void {
    this.service.getSchedulerTasks().subscribe((data) => {
      this.tasks.set(new DataSource(data));
      this.repaintScheduler();
    })
  }

  onCalendarDateChange = (date: Date) => {
    this.currentDate.set(date);
    this.updateAgenda({ startDate: this.currentDate() });
    this.repaintScheduler();
  };

  getSchedulerCurrentDate = (currentDate: Date) => {
    const schedulerInstance = this.schedulerRef?.instance;
    const startViewDate = schedulerInstance?.getStartViewDate();
    const endViewDate = schedulerInstance?.getEndViewDate();

    if (this.schedulerCurrentDate().getMonth() !== currentDate.getMonth() ||
      startViewDate && startViewDate > currentDate ||
      endViewDate && endViewDate < currentDate
    ) {
      this.schedulerCurrentDate.set(currentDate);
    }

    return this.schedulerCurrentDate();
  }

  onSchedulerOptionChanged(e: DxSchedulerTypes.OptionChangedEvent) {
    if (e.name === 'currentView') {
      this.onCurrentViewChange(e.value);
    }
  }
  onCurrentViewChange = (view: DxSchedulerTypes.ViewType) => {
    this.currentView.set(view);

    if (this.currentView() === 'month' && !this.screen.sizes['screen-x-small']) {
      this.isRightPanelOpen.set(true);
      this.updateAgenda({ startDate: this.currentDate() });
    }

    this.repaintScheduler();
  }

  onSelectedDateChange = (e?: Date) => {
    const date = e instanceof Date ? e : new Date();
    this.currentDate.set(date);
    this.selectedAppointment.set({ data: { startDate: date }, target: undefined });
    this.updateAgenda({ startDate: date });
  }

  onCellClick = ({cellData}: any) => {
    this.onSelectedDateChange(cellData.startDate);

    if (this.currentView() === 'month' && cellData) {
      const cellAppointments = this.findAllAppointmentsForDay(cellData);

      if (cellAppointments.length > 1) {
        this.selectedAppointment.set({ data: cellData, target: null });
        this.agendaItems.set(cellAppointments);
        this.toggleRightPanelOpen(true);
      }
    }
  };

  calendarListChanged(selectedCalendars: any[]) {
    const filters = selectedCalendars
      .flatMap((calendar) => [['calendarId', '=', calendar.id], 'or']).slice(0, -1);

    const tasksDs = this.tasks();
    tasksDs?.filter(filters.length > 0 ? filters : null);

    tasksDs?.load();
    this.updateAgenda({ startDate: this.currentDate() });
  }

  repaintScheduler() {
    setTimeout(() => this.schedulerRef?.instance.repaint(), 0);
  }

  getTooltipPosition = (selectedAppointment: SelectedAppointment, rightPanelOpen: boolean, isXSmall: boolean) => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }

  toggleRightPanelOpen(isOpen?: boolean) {
    this.isRightPanelOpen.set(isOpen || !this.isRightPanelOpen());
    this.repaintScheduler();
  }

  showAppointmentCreationForm(appointment?: SelectedAppointment) {
    this.schedulerRef?.instance.showAppointmentPopup(appointment?.data, !appointment);
  }

  findAllAppointmentsForDay = (selectedAppointment: any) => {
    const tasksDs = this.tasks();
    if (!tasksDs) {
      return [];
    }
    const appointments = tasksDs.items();
    if (appointments.length === 0 || !selectedAppointment) {
      return [];
    }
    return appointments
      .filter((appointment) => {
        return appointment.startDate.getDate() === selectedAppointment.startDate.getDate()
          && appointment.startDate.getMonth() === selectedAppointment.startDate.getMonth();
      });
  }

  updateAgenda = (appointmentData?: any) => {
    this.agendaItems.set(this.findAllAppointmentsForDay(appointmentData));
  }

  onAppointmentClick(e: any) {
    const appointmentData = e.appointmentData;
    this.selectedAppointment.set({ data: appointmentData, target: e.targetElement });

    if (this.currentView() === 'month') {
      this.updateAgenda(appointmentData);
      this.toggleRightPanelOpen(true);
    }
  }

  onAppointmentTooltipShowing = (e: any) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;
    const isAppointmentCollectorClicked = (evt: any) => {
      return evt.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
    };

    this.selectedAppointment.set({ data: appointmentData, target: e.targetElement });

    if (this.currentView() === 'month' || isAppointmentCollectorClicked(e)) {
      this.updateAgenda(appointmentData);
    }

    if (this.currentView() === 'month' && this.screen.sizes['screen-small'] ||
        isAppointmentCollectorClicked(e)) {
      this.toggleRightPanelOpen(true);
    }
    else {
      this.tooltipRef?.instance.show();
    }
  }

  showAppointmentTooltip = (e: any) => {
    this.schedulerRef?.instance.showAppointmentTooltip(e.itemData, e.element);
  };

  editSelectedAppointment() {
    this.showAppointmentCreationForm(this.selectedAppointment());
    this.tooltipRef?.instance.hide();
  }

  deleteSelectedAppointment(appointmentData: any) {
    this.schedulerRef?.instance.deleteAppointment(this.selectedAppointment()?.data);
    this.tooltipRef?.instance.hide();
    this.agendaItems.set(this.findAllAppointmentsForDay(appointmentData));
  }
}
