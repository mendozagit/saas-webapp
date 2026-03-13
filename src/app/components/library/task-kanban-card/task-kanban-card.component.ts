import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LowerCasePipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DxButtonModule, DxToastModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { Task } from 'src/app/types/task';
import { UserAvatarComponent } from 'src/app/components/library/user-avatar/user-avatar.component';

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxToastModule,
    LowerCasePipe,
    DatePipe,
    UserAvatarComponent,
  ],
})
export class TaskKanbanCardComponent {
  readonly task = input<Task>();

  private router = inject(Router);

  getAvatarText = (name: string) => name.split(' ').map((name) => name[0]).join('');

  notify = (e) => {
    e.event.stopPropagation();
    notify(`Edit '${this.task().text}' card event`);
  };

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details'], {
      queryParams: { id: this.task().id }
    });
  };
}

