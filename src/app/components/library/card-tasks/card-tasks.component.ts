import {
  ChangeDetectionStrategy, Component, effect, input, signal, ViewChild,
} from '@angular/core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Task } from '../../../types/task';

@Component({
  selector: 'card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.scss'],
  imports: [
    DxDataGridModule,
    DxLoadPanelModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTasksComponent {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  readonly tasks = input<Task[]>();

  readonly isLoading = input(false);

  readonly currentTasks = signal<Task[] | undefined>(undefined);

  constructor() {
    this.onReorder = this.onReorder.bind(this);
    effect(() => {
      const t = this.tasks();
      if (t) {
        this.currentTasks.set(t.filter((item) => !!item.status && !!item.priority));
      }
    });
  }

  onReorder(e: DxDataGridTypes.RowDraggingReorderEvent) {
    const visibleRows = e.component.getVisibleRows();
    const tasks = this.currentTasks();
    if (!tasks) return;
    const toIndex = tasks.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = tasks.indexOf(e.itemData);

    this.currentTasks.update((current) => {
      if (!current) return current;
      const updated = [...current];
      updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, e.itemData);
      return updated;
    });
  }
}
