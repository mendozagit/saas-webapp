import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Sales } from 'src/app/types/analytics';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'revenue-total-ticker',
  templateUrl: 'revenue-total-ticker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TickerCardComponent,
  ],
})
export class RevenueTotalTickerComponent {
  readonly data = input<Sales>();
}

