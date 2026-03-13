import {
  ChangeDetectionStrategy, Component, ViewChild, effect, input, output, signal, inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { StatusIndicatorComponent } from 'src/app/components';
import { exportDataGrid as exportToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import 'jspdf-autotable';

@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    StatusIndicatorComponent,
  ],
  providers: []
})
export class TaskListGridComponent {
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  readonly dataSource = input<Task[]>();

  readonly tabValueChanged = output<any>();

  private router = inject(Router);

  readonly tasks = signal<Task[]>([]);

  priorityList = taskPriorityList;

  statusList = taskStatusList;

  readonly isLoading = signal(true);

  useNavigation = true;

  constructor() {
    effect(() => {
      const ds = this.dataSource();
      if (ds) {
        this.tasks.set(ds.filter((item) => !!item.status && !!item.priority));
      }
    });
  }

  refresh() {
    this.grid.instance.refresh();
  }

  showColumnChooser() {
    this.grid.instance.showColumnChooser();
  }

  search(text: string) {
    this.grid.instance.searchByText(text);
  }

  onExportingToPdf() {
    const doc = new jsPDF();
    exportToPdf({
      jsPDFDocument: doc,
      component: this.grid.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  }

  onExportingToXLSX() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    exportToXLSX({
      component: this.grid.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
      });
    });
  }

  toogleUseNavigation = () => {
    this.useNavigation = !this.useNavigation;
  };

  navigateToDetails = (e: DxDataGridTypes.RowClickEvent) => {
    if(this.useNavigation && e.rowType !== 'detailAdaptive') {
      this.router.navigate(['/planning-task-details'], {
        queryParams: { id: e.data.id }
      });
    }
  };
}

