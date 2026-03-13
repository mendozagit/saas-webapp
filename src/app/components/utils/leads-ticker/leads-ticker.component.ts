import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TickerCardComponent } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'leads-ticker',
  templateUrl: 'leads-ticker.component.html',
  imports: [
    TickerCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsTickerComponent {
}
