import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'opportunities-ticker',
  templateUrl: 'opportunities-ticker.component.html',
  imports: [
    TickerCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OpportunitiesTickerComponent {
  readonly data = input<SalesOrOpportunitiesByCategory | null>(null);
}
