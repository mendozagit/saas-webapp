import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { Sale } from 'src/app/types/analytics';

@Component({
  selector: 'sales-performance-card',
  templateUrl: './sales-performance-card.component.html',
  styleUrls: ['./sales-performance-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAnalyticsComponent,
    DxChartModule,
    DxDropDownButtonModule,
  ],
})
export class SalesPerformanceCardComponent {
  readonly groupByPeriods = input<string[]>();

  readonly salesByDateAndCategory = input<Sale[]>();

  readonly visualRange = input<unknown>({});

  readonly performancePeriodChanged = output<any>();

  customiseToolip({ seriesName }: { seriesName: string }) {
    return { text: seriesName };
  }

  onDropDownSelectionChange(event: any) {
    this.performancePeriodChanged.emit(event);
  }
}
