import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { CardMenuComponent } from '../card-menu/card-menu.component';
import { Activity } from 'src/app/types/activities';

@Component({
  selector: 'card-activities',
  templateUrl: './card-activities.component.html',
  styleUrls: ['./card-activities.component.scss'],
  imports: [
    DxListModule,
    DxButtonModule,
    DxLoadPanelModule,
    CardMenuComponent,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActivitiesComponent {
  readonly activities = input<Activity[]>();

  readonly showBy = input(false);

  readonly isLoading = input(false);

  activityMenuItems: Array<{ text: string }> = [
    { text: 'View Details' },
    { text: 'Delete Record' },
  ];
}
