import {
  ChangeDetectionStrategy, Component, computed, input,
} from '@angular/core';
import { TaskStatus, TaskPriority } from 'src/app/types/task';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'status-indicator',
  template: `
    <div
      [class.input-with-bar]="showBar()"
      class="
      status
      status-indicator
      status-indicator-{{ dashValue() }}">
      @if (!isField()) {
        <span class="status-indicator-{{ dashValue() }}">{{ getValue(value()) }}</span>
      }
      @if (isField()) {
        <dx-text-box
          class="status-indicator-{{ dashValue() }}"
          [inputAttr]="{class: 'status-input status-editor-input'}"
          [hoverStateEnabled]="false"
          [readOnly]="true"
          [value]="getValue(value())">
        </dx-text-box>
      }
    </div>
  `,
  styleUrls: ['./status-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxTextBoxModule,
  ]
})
export class StatusIndicatorComponent {
  readonly value = input<TaskStatus | TaskPriority>();

  readonly isField = input(true);

  readonly showBar = input(false);

  readonly dashValue = computed(() => this.spaceToDash(this.value() as TaskStatus).toLowerCase());

  getValue(value: string): string {
    return (this.showBar() ? '| ' : '') + value;
  }

  spaceToDash = (value: TaskStatus) =>
    (value?.replace(/ /g, '-') || '');
}

