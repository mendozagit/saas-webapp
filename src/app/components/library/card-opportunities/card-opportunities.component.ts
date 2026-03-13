import {
  ChangeDetectionStrategy, Component, computed, input,
} from '@angular/core';
import {
  DxButtonModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { Opportunity } from 'src/app/types/opportunities';
import { OpportunityTileComponent } from 'src/app/components/utils/opportunity-tile/opportunity-tile.component';

@Component({
  selector: 'card-opportunities',
  templateUrl: './card-opportunities.component.html',
  styleUrls: ['./card-opportunities.component.scss'],
  imports: [
    DxButtonModule,
    DxLoadPanelModule,
    OpportunityTileComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOpportunitiesComponent {
  readonly openedOpportunities = input<Opportunity[]>();

  readonly closedOpportunities = input<Opportunity[]>();

  readonly isLoading = computed(() => !this.openedOpportunities() || !this.closedOpportunities());
}
