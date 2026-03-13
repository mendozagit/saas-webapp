import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-analysis-by-states-card',
  templateUrl: './revenue-analysis-by-states-card.component.html',
  styleUrls: ['./revenue-analysis-by-states-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAnalyticsComponent,
    DxDataGridModule,
    DxBulletModule,
  ],
})
export class RevenueAnalysisByStatesCardComponent {
  readonly data = input<SalesByStateAndCity>();
}
