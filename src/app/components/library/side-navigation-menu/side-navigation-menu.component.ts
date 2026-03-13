import {
  ChangeDetectionStrategy,
  Component,
  output,
  input,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent, DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import * as events from 'devextreme/events';
import { navigation } from '../../../app-navigation';

@Component({
  selector: 'side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ DxTreeViewModule ],
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
    menu!: DxTreeViewComponent;

  readonly selectedItemChanged = output<DxTreeViewTypes.ItemClickEvent>();

  readonly openMenu = output<any>();

  readonly compactMode = input(false);

  readonly selectedItem = input<String>();

  private _items!: Record<string, unknown>[];

  private elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      const val = this.compactMode();
      if (!this.menu?.instance) {
        return;
      }
      if (val) {
        this.menu.instance.collapseAll();
      } else {
        this.menu.instance.expandItem(this.selectedItem());
      }
    });

    effect(() => {
      this.selectedItem();
      this.setSelectedItem();
    });
  }

  get items() {
    if (!this._items) {
      this._items = navigation.map((item) => {
        if (item.path && !(/^\//.test(item.path))) {
          item.path = `/${item.path}`;
        }
        return { ...item, expanded: !this.compactMode() };
      });
    }

    return this._items;
  }

  setSelectedItem() {
    if (!this.menu?.instance) {
      return;
    }

    this.menu.instance.selectItem(this.selectedItem());
  }

  onItemClick(event: DxTreeViewTypes.ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    this.setSelectedItem();
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.emit(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}
