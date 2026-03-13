import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject, signal,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel'

import { DataService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { RevenueAnalysisByStatesCardComponent } from 'src/app/components/utils/revenue-analysis-by-states-card/revenue-analysis-by-states-card.component';
import { SalesMapCardComponent } from 'src/app/components/utils/sales-map-card/sales-map-card.component';
import { RevenueSnapshotByStatesCardComponent } from 'src/app/components/utils/revenue-snapshot-by-states-card/revenue-snapshot-by-states-card.component';
import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import { SalesByState, SalesByStateAndCity } from 'src/app/types/analytics';

@Component({
  templateUrl: './analytics-geography.component.html',
  styleUrls: ['./analytics-geography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ DataService ],
  imports: [
    DxScrollViewModule,
    DxDataGridModule,
    DxBulletModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxChartModule,
    ToolbarAnalyticsComponent,
    DxLoadPanelModule,
    RevenueAnalysisByStatesCardComponent,
    SalesMapCardComponent,
    RevenueSnapshotByStatesCardComponent,
  ]
})
export class AnalyticsGeographyComponent implements OnInit, OnDestroy {
  private service = inject(DataService);

  analyticsPanelItems = analyticsPanelItems;

  salesByStateAndCity = signal<SalesByStateAndCity>(undefined);

  salesByState = signal<SalesByState>(undefined);

  salesByStateMarkers = signal<unknown>(undefined);

  subscription: Subscription = new Subscription();

  isLoading = signal(false);

  ngOnInit(): void {
    const dates = analyticsPanelItems[4].value.split('/');

    this.loadData(dates[0], dates[1]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectionChange(e: Dates) {
    this.loadData(e.startDate, e.endDate);
  }

  createMapCoords(coords: string) {
    let resultCoords: number[] = [];

    coords.split(', ').forEach((coord) => {
      resultCoords.push(parseFloat(coord));
    });

    return resultCoords;
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading.set(true);

    this.service.getSalesByStateAndCity(startDate, endDate).subscribe((data: SalesByStateAndCity) => {
      this.salesByStateAndCity.set(data);
      const salesByState = this.service.getSalesByState(data);
      this.salesByState.set(salesByState);
      this.salesByStateMarkers.set({
        type: 'StateCollection',
        features: salesByState.map((item) => ({
          type: 'State',
          geometry: {
            type: 'Point',
            coordinates: this.createMapCoords(item.stateCoords),
          },
          properties: {
            text: item.stateName,
            value: item.total,
            tooltip: `<b>${item.stateName}</b>\n${item.total}K`,
          },
        })),
      });

      this.isLoading.set(false);
    });
  };
}
