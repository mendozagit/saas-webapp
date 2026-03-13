import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import notify from 'devextreme/ui/notify';

import { taskPanelItems } from 'src/app/types/resource';
import { Task, newTask } from 'src/app/types/task';
import { DataService, ScreenService } from 'src/app/services';
import { forkJoin, map, Observable } from 'rxjs';
import { TaskFormComponent } from 'src/app/components/library/task-form/task-form.component';
import { FormPopupComponent } from 'src/app/components/utils/form-popup/form-popup.component';
import { TaskListGridComponent } from 'src/app/components/library/task-list-grid/task-list-grid.component';
import { TaskListKanbanComponent } from 'src/app/components/library/task-list-kanban/task-list-kanban.component';
import { TaskListGanttComponent } from 'src/app/components/library/task-list-gantt/task-list-gantt.component';

@Component({
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,
    DxLoadPanelModule,
    FormPopupComponent,
    TaskFormComponent,
    TaskListKanbanComponent,
    TaskListGridComponent,
    TaskListGanttComponent,
    AsyncPipe,
  ]
})
export class PlanningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban: TaskListKanbanComponent;

  @ViewChild(TaskFormComponent, { static: false }) taskForm: TaskFormComponent;

  private service = inject(DataService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  protected screen = inject(ScreenService);

  newTask = newTask;

  taskPanelItems = taskPanelItems;

  displayTaskComponent = signal(this.taskPanelItems[0].text);

  selectedIndex = signal(0);

  isAddTaskPopupOpened = signal(false);

  displayGrid = signal(true);

  displayKanban = signal(false);

  taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;

  private readonly viewToParam: Record<string, string> = {
    [this.taskPanelItems[0].text]: 'list',
    [this.taskPanelItems[1].text]: 'kanban-board',
    [this.taskPanelItems[2].text]: 'gantt'
  };

  private readonly paramToView: Record<string, string> = Object.fromEntries(
    Object.entries(this.viewToParam).map(([k, v]) => [v, k])
  );

  ngOnInit(): void {
    this.taskCollections$ = forkJoin([
      this.service.getFilteredTasks(),
      this.service.getTasks()
    ]).pipe(
      map(
        ([filteredTasks, allTasks]) => { return { allTasks, filteredTasks }  })
    );

    this.route.queryParamMap.subscribe(params => {
      const viewParam = params.get('view');
      if (viewParam && this.paramToView[viewParam] && this.paramToView[viewParam] !== this.displayTaskComponent()) {
        this.displayTaskComponent.set(this.paramToView[viewParam]);
        this.updateFlags();
      } else if (!viewParam) {
        this.updateQueryParam();
      }
    });

    this.updateFlags();
  }

  tabValueChange(e: DxTabsTypes.ItemClickEvent) {
    const { itemData } = e;

    this.displayTaskComponent.set(itemData.text);
    this.updateFlags();
    this.updateQueryParam();
  }

  addTask = () => {
    this.isAddTaskPopupOpened.set(true);
  };

  onClickSaveNewTask = () => {
    notify({
      message: `New task "${this.taskForm.getNewTaskData().text}" saved`,
      position: { at: 'bottom center', my: 'bottom center' }
    },
    'success');
  };

  refresh = () => {
    if (this.displayGrid()) {
      this.dataGrid.refresh();
    } else if (this.displayKanban()) {
      this.kanban.refresh();
    } else {
      this.gantt.refresh();
    }
  };

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  searchDataGrid = (e: DxTextBoxTypes.InputEvent) => this.dataGrid.search(e.component.option('text'));

  exportToPdf = () => {
    if (this.displayGrid()) {
      this.dataGrid.onExportingToPdf();
    } else {
      this.gantt.onExporting();
    }
  };

  exportDataGridToXSLX = () => this.dataGrid.onExportingToXLSX();

  private updateFlags() {
    this.displayGrid.set(this.displayTaskComponent() === this.taskPanelItems[0].text);
    this.displayKanban.set(this.displayTaskComponent() === this.taskPanelItems[1].text);
    const idx = this.taskPanelItems.findIndex(i => i.text === this.displayTaskComponent());
    this.selectedIndex.set(idx >= 0 ? idx : 0);
  }

  private updateQueryParam() {
    const qp = this.viewToParam[this.displayTaskComponent()];
    if (qp) {
      this.router.navigate([], { queryParams: { view: qp }, queryParamsHandling: 'merge', replaceUrl: true });
    }
  }
}
