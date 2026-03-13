import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DxListModule } from 'devextreme-angular/ui/list';
import { Duration } from 'luxon';
import { ApplyPipeDirective } from "../../../pipes/apply.pipe";

@Component({
  selector: 'agenda-list-item',
  template: `
    <div class='agenda-list-item'>
      <div class='time'>
        <div class='start'>{{getStart| apply: appointment()}}</div>
        <div class='duration'>{{ getFormattedDuration | apply: appointment()}}</div>
      </div>
      <div class='description'>
        <div class='description-title'>
          {{appointment().text}}
        </div>
        <div class='description-resource'>
          {{resources()[appointment().calendarId]?.text}}
        </div>
      </div>
    </div>
`,
  styleUrls: ['./agenda-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxListModule,
    ApplyPipeDirective,
  ],
})
export class AgendaListItemComponent {
  readonly appointment = input<Record<string, any>>({});

  readonly resources = input<Record<string, any>>([]);

  getFormattedDuration = ({ startDate, endDate }) => {
    return Duration.fromMillis(endDate - startDate)
      .rescale()
      .toFormat("h'h' m'm'");
  };

  getStart = (appointment) => {
    return appointment.startDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
  };
}
