import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import {
  CardNotesComponent,
  CardMessagesComponent,
  CardActivitiesComponent,
  CardOpportunitiesComponent,
  CardTasksComponent,
} from 'src/app/components';
import { Activity } from 'src/app/types/activities';
import { Messages } from 'src/app/types/messages';
import { Notes } from 'src/app/types/notes';
import { Opportunities } from 'src/app/types/opportunities';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'contact-cards',
  templateUrl: './contact-cards.component.html',
  styleUrls: ['./contact-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,

    CardNotesComponent,
    CardMessagesComponent,
    CardActivitiesComponent,
    CardOpportunitiesComponent,
    CardTasksComponent,
  ],
})
export class ContactCardsComponent {
  readonly tasks = input<Task[]>();

  readonly activities = input<Activity[]>();

  readonly activeOpportunities = input<Opportunities>();

  readonly closedOpportunities = input<Opportunities>();

  readonly notes = input<Notes>();

  readonly messages = input<Messages>();

  readonly contactName = input<string>();

  readonly isLoading = input(false);
}

