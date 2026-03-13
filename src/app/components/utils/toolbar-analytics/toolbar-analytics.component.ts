import { ChangeDetectionStrategy, Component, input, output, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { DxButtonComponent } from "devextreme-angular";
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { type DxTabsTypes } from 'devextreme-angular/ui/tabs';

import { ScreenService } from 'src/app/services';
import { Dates, PanelItem } from 'src/app/types/resource';

@Component({
  selector: 'toolbar-analytics',
  templateUrl: './toolbar-analytics.component.html',
  styleUrls: ['./toolbar-analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DxButtonComponent,
    DxTabsModule,
    DxToolbarModule
  ],
})
export class ToolbarAnalyticsComponent {
  readonly selectedItems = input<Array<number>>();

  readonly titleText = input<string>();

  readonly panelItems = input<Array<PanelItem>>();

  readonly selectionChanged = output<Dates>();

  protected screen = inject(ScreenService);

  selectionChange(e: DxTabsTypes.SelectionChangedEvent) {
    const dates = e.addedItems[0].value.split('/');

    this.selectionChanged.emit({ startDate: dates[0], endDate: dates[1] });
  }
}
