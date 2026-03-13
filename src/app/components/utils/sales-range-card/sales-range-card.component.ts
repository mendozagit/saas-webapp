import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardAnalyticsComponent } from '../../library/card-analytics/card-analytics.component';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { Sale } from 'src/app/types/analytics';
import { DxLoadIndicatorModule } from 'devextreme-angular';

@Component({
  selector: 'sales-range-card',
  templateUrl: './sales-range-card.component.html',
  styleUrls: ['./sales-range-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAnalyticsComponent,
    DxRangeSelectorModule,
    DxLoadIndicatorModule
  ],
})
export class SalesRangeCardComponent {
  readonly data = input<Sale[]>();

  readonly visualRange = input<unknown>({});

  readonly visualRangeChange = output<unknown>();

  readonly salesRangeChanged = output<any>();

  onRangeChanged(event: any) {
    this.salesRangeChanged.emit(event);
    this.visualRangeChange.emit(this.visualRange());
  }
}

