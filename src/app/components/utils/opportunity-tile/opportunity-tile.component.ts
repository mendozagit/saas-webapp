import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Opportunity } from 'src/app/types/opportunities';
import { CurrencyPipe } from '@angular/common';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'opportunity-tile',
  templateUrl: 'opportunity-tile.component.html',
  styleUrls: ['./opportunity-tile.component.scss'],
  imports: [ CurrencyPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpportunityTileComponent {
  readonly data = input<Opportunity>();

  opportunityClick() {
    notify('Click opportunity event');
  }
}
