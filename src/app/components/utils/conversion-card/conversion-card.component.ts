import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardAnalyticsComponent } from 'src/app/components/library/card-analytics/card-analytics.component';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  selector: 'conversion-card',
  templateUrl: 'conversion-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAnalyticsComponent,
    DxFunnelModule,
  ],
})
export class ConversionCardComponent {
  readonly data = input<SalesOrOpportunitiesByCategory>();

  customizeOppText(arg: { valueText: string }) {
    return `$${arg.valueText}`;
  }
}

