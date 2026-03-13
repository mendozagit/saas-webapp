import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { PositionConfig } from 'devextreme/animation/position';
import { CardMenuComponent } from '../card-menu/card-menu.component';
@Component({
  selector: 'card-analytics',
  templateUrl: './card-analytics.component.html',
  styleUrls: ['./card-analytics.component.scss'],
  imports: [
    DxLoadPanelModule,
    CardMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardAnalyticsComponent {
  readonly titleText = input<string>();

  readonly contentClass = input<string>();

  readonly isMenuVisible = input(true);

  readonly isLoading = input(false);

  menuItems: Array<{ text: string }> = [
    { text: 'Configure' },
    { text: 'Remove' },
  ];

  position: PositionConfig;
}
