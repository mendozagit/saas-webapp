import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
  selector: 'revenue-snapshot-card',
  templateUrl: './revenue-snapshot-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAnalyticsComponent,
    DxPieChartModule,
  ],
})
export class RevenueSnapshotCardComponent {
  readonly data = input<SalesByStateAndCity>();

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

