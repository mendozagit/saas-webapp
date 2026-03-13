import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Sales, SalesOrOpportunitiesByCategory } from '../../../types/analytics';
import { ApplyPipeDirective } from "src/app/pipes/apply.pipe";

@Component({
  selector: 'ticker-card',
  templateUrl: './ticker-card.component.html',
  styleUrls: ['./ticker-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ApplyPipeDirective,
    CurrencyPipe,
  ],
})

export class TickerCardComponent {
  readonly titleText = input<string>();

  readonly data = input<SalesOrOpportunitiesByCategory | Sales | null>(null);

  readonly total = input<string | null>(null);

  readonly percentage = input<number>();

  readonly icon = input<string>();

  readonly tone = input<'warning' | 'info'>();

  readonly contentClass = input<string | null>(null);

  getTotal(data: Array<{value?: number, total?: number}> ): number {
    return (data || []).reduce((total, item) => total + (item.value || item.total), 0);
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  getIconClass = () => this.tone() || (this.percentage() > 0 ? 'positive' : 'negative');
}

