import {
  ChangeDetectionStrategy, Component, input, output,
} from '@angular/core';
import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
import { Task } from 'src/app/types/task';
import { AgendaListItemComponent } from "./agenda-list-item.component";

export type AgendaItem = { startDate: Date };

@Component({
  selector: 'agenda',
  template: `
    <dx-list
      [dataSource]="items()"
      (onItemClick)="handleItemClick($event)"
    >
      <div
        *dxTemplate="let task of 'item'"
        class="agenda-item"
      >
        <agenda-list-item
          [appointment]="task"
          [resources]="resources()">
        </agenda-list-item>
      </div>
    </dx-list>
  `,
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxListModule,
    AgendaListItemComponent,
  ],
})
export class AgendaComponent {
  readonly items = input<AgendaItem[]>();

  readonly resources = input<Record<string, any>[]>();

  readonly clickAppointment = output<{ itemData: Task, element: EventTarget }>();

  handleItemClick(e: DxListTypes.ItemClickEvent) {
    const { itemData, element } = e;
    this.clickAppointment.emit({itemData, element});
  }
}
