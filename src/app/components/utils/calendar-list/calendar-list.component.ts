import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { DxButtonModule, DxCheckBoxModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular/ui/list';

@Component({
  selector: 'calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxListModule,
    DxCheckBoxModule,
    DxButtonModule,
  ],
})
export class CalendarListComponent {
  readonly dataSource = input<Record<string, any>[]>();

  readonly listSelectionChanged = output<any>();

  readonly selectedItems = signal<any[]>([]);

  constructor() {
    effect(() => {
      const ds = this.dataSource();
      if (ds) {
        this.selectedItems.set([...ds.flatMap((el) => el.items)]);
      }
    });
  }

  selectionChanged(item: unknown, isSelected: boolean) {
    const selected = this.selectedItems();
    this.selectedItems.set(isSelected ? [...selected, item] : selected.filter((el) => el !== item));
    this.listSelectionChanged.emit(this.selectedItems());
  }
}
