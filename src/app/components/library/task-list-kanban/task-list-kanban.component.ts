import {
  ChangeDetectionStrategy, Component, effect, input, output, signal, ViewChild,
} from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSortableModule, DxSortableComponent } from 'devextreme-angular/ui/sortable';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';

import { CardMenuComponent } from 'src/app/components';
import { Task } from 'src/app/types/task';
import { TaskStatus, taskStatusList } from 'src/app/types/task';
import { TaskKanbanCardComponent } from '../task-kanban-card/task-kanban-card.component';

type Board = {
  name: TaskStatus
  cards: Task[]
};

@Component({
  selector: 'task-list-kanban',
  templateUrl: './task-list-kanban.component.html',
  styleUrls: ['./task-list-kanban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxScrollViewModule,
    DxSortableModule,
    TaskKanbanCardComponent,
    CardMenuComponent,
  ]
})
export class TaskListKanbanComponent {
  @ViewChild(DxSortableComponent, { static: false }) sortable: DxSortableComponent;

  readonly dataSource = input<Task[]>();

  readonly addTaskEvent = output<void>();

  readonly kanbanDataSource = signal<Board[]>([]);

  statuses = taskStatusList;

  boardMenuItems: Array<{ text: string }> = [
    { text: 'Add card' },
    { text: 'Copy list' },
    { text: 'Move list' },
  ];

  constructor() {
    effect(() => {
      const ds = this.dataSource();
      if (ds) {
        this.kanbanDataSource.set(this.fillOutBoard(ds));
      }
    });
  }

  refresh() {
    this.sortable.instance.update();
  }

  fillOutBoard = (cards: Task[]): Board[] => {
    const result: Board[] = [];
    for (const status of this.statuses) {
      const value = cards.filter((item) => item.status === status);

      result.push(<Board>{ name: status, cards: value });
    }

    return result;
  };

  onListReorder = (e: DxSortableTypes.ReorderEvent) => {
    const { fromIndex, toIndex } = e;
    const current = this.kanbanDataSource();
    const list = current.splice(fromIndex, 1)[0];
    current.splice(toIndex, 0, list);
    this.kanbanDataSource.set([...current]);
  };

  onTaskDragStart(e: DxSortableTypes.DragStartEvent) {
    const { fromData, fromIndex } = e;
    e.itemData = fromData.cards[fromIndex];
  }

  onTaskDrop(e: DxSortableTypes.ReorderEvent | DxSortableTypes.AddEvent) {
    const {
      fromData, toData, fromIndex, toIndex, itemData,
    } = e;

    itemData.status = toData.name;

    fromData.cards.splice(fromIndex, 1);
    toData.cards.splice(toIndex, 0, itemData);
  }

  addTask() {
    this.addTaskEvent.emit();
  }
}

