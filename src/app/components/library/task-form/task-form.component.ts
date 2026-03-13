import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxToolbarModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  StatusIndicatorComponent,
  FormDateboxComponent,
  FormTextboxComponent,
} from 'src/app/components';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ScreenService } from '../../../services';
import { ToolbarFormComponent } from 'src/app/components/utils/toolbar-form/toolbar-form.component';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxToolbarModule,
    DxValidatorModule,
    FormTextboxComponent,
    StatusIndicatorComponent,
    FormDateboxComponent,
    ToolbarFormComponent,
  ],
})
export class TaskFormComponent {
  readonly task = input<Task>();

  readonly isLoading = input(false);

  readonly isCreateMode = input(false);

  protected screen = inject(ScreenService);

  savedData: Task = null;

  readonly isEditing = signal(false);

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  getSizeQualifier = getSizeQualifier;

  constructor() {
    effect(() => {
      if (this.isCreateMode()) {
        this.isEditing.set(true);
      }
    });
  }

  handleEditClick = () => {
    this.savedData = { ...this.task() }
    this.isEditing.set(true);
  };

  handleSaveClick = ({ validationGroup }: DxButtonTypes.ClickEvent) => {
    if(!validationGroup.validate().isValid) return;
    this.savedData = null;
    this.isEditing.set(false);
  };

  handleCancelClick = () => {
    // Task is an input signal, so we restore via savedData reference
    Object.assign(this.task(), this.savedData);
    this.isEditing.set(false);
  };

  getNewTaskData = ()=> ({ ...this.task() });
}
