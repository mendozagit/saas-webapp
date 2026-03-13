import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { formatDate } from '@angular/common';

import { Observable, forkJoin } from 'rxjs';
import { share } from 'rxjs/operators';

import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';

import { DataService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { SalesByRangeCardComponent } from 'src/app/components/utils/sales-by-range-card/sales-by-range-card.component';
import { SalesPerformanceCardComponent } from 'src/app/components/utils/sales-performance-card/sales-performance-card.component';
import { SalesRangeCardComponent } from 'src/app/components/utils/sales-range-card/sales-range-card.component';
import { analyticsPanelItems } from 'src/app/types/resource';
import { Sale, SalesOrOpportunitiesByCategory } from 'src/app/types/analytics';

@Component({
  templateUrl: './analytics-sales-analysis.component.html',
  styleUrls: ['./analytics-sales-analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ DataService ],
  imports: [
    DxScrollViewModule,
    DxLoadPanelModule,
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    DxChartModule,
    DxDropDownButtonModule,
    DxRangeSelectorModule,
    ToolbarAnalyticsComponent,
    SalesByRangeCardComponent,
    SalesPerformanceCardComponent,
    SalesRangeCardComponent,
  ]
})
export class AnalyticsSalesAnalysisComponent implements OnInit {
  private service = inject(DataService);

  groupByPeriods = ['Day', 'Month'];

  visualRange = signal<unknown>({});

  isLoading = signal(true);

  sales = signal<Sale[]>(null);
  salesByCategory = signal<SalesOrOpportunitiesByCategory>(null);
  salesByDateAndCategory = signal<Sale[]>(null);

  customRange = signal(analyticsPanelItems[5].value.split('/').map((d) => new Date(d)));

  onRangeChanged = ({value: dates}: {value: Date[]}) => {
    const [startDate, endDate] = dates.map((date) => formatDate(date, 'yyyy-MM-dd', 'en'));

    this.isLoading.set(true);

    this.service.getSalesByCategory(startDate, endDate)
      .subscribe((result) => {
        this.salesByCategory.set(result);
        this.isLoading.set(false);
      });
  };

  selectionChange({item: period}: DxDropDownButtonTypes.SelectionChangedEvent) {
    this.isLoading.set(true);

    this.service.getSalesByOrderDate(period.toLowerCase())
      .subscribe((result) => {
        this.salesByDateAndCategory.set(result);
        this.isLoading.set(false);
      })
  }

  loadData = (groupBy: string) => {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');
    const signalMap: Record<string, ReturnType<typeof signal>> = {
      sales: this.sales,
      salesByDateAndCategory: this.salesByDateAndCategory,
    };
    const tasks = [
      ['sales', this.service.getSales(startDate, endDate)],
      ['salesByDateAndCategory', this.service.getSalesByOrderDate(groupBy)],
    ].map(([dataName, loader]: [string, Observable<Sale[]>]) => {
      const task = loader.pipe(share());
      task.subscribe((data) => signalMap[dataName].set(data));
      return task;
    }
    );

    forkJoin(tasks).subscribe(() => {
      this.isLoading.set(false);
    });
  };

  ngOnInit(): void {
    this.visualRange.set(this.customRange());
    this.onRangeChanged({ value: this.customRange() });
    this.loadData(this.groupByPeriods[1].toLowerCase());
  }
}

