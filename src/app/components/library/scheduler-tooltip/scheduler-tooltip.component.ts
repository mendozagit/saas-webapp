import {
  ChangeDetectionStrategy, Component, input, output,
} from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { ApplyPipeDirective } from "../../../pipes/apply.pipe";

@Component({
  selector: 'scheduler-tooltip',
  templateUrl: './scheduler-tooltip.component.html',
  styleUrls: ['./scheduler-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ApplyPipeDirective,
    DxButtonModule,
  ],
})
export class SchedulerTooltipComponent {
  readonly selectedAppointmentData = input<Record<string, any>>();

  readonly clickDeleteAppointment = output<any>();

  readonly clickEditAppointment = output<void>();

  getTimeString = (selectedAppointmentData) => {
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };

    const dateOptions = {
      ...timeOptions,
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };

    return `${selectedAppointmentData.startDate.toLocaleString(undefined, dateOptions)} - ${selectedAppointmentData.endDate?.toLocaleTimeString(undefined, timeOptions)}`;
  }
}
