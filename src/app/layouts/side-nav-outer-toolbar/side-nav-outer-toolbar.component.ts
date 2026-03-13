import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { ScreenService, AppInfoService } from '../../services';
import { SideNavigationMenuComponent, AppHeaderComponent, AppFooterComponent } from '../../components';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    SideNavigationMenuComponent,
    DxDrawerModule,
    AppHeaderComponent,
    AppFooterComponent
  ],
})
export class SideNavOuterToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;

  readonly title = input<string>();

  private screen = inject(ScreenService);

  private router = inject(Router);

  protected appInfo = inject(AppInfoService);

  selectedRoute = signal('');

  menuOpened = signal(false);

  temporaryMenuOpened = signal(false);

  menuMode = signal<DxDrawerTypes.OpenedStateMode>('shrink');

  menuRevealMode = signal<DxDrawerTypes.RevealMode>('expand');

  minMenuSize = signal(0);

  shaderEnabled = signal(false);

  routerSubscription: Subscription;

  screenSubscription: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute.set(event.urlAfterRedirects.split('?')[0]);
      }
    });
  }

  ngOnInit() {
    this.menuOpened.set(this.screen.sizes['screen-large']);

    this.screenSubscription = this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode.set(isLarge ? 'shrink' : 'overlap');
    this.menuRevealMode.set(isXSmall ? 'slide' : 'expand');
    this.minMenuSize.set(isXSmall ? 0 : 48);
    this.shaderEnabled.set(!isLarge);
  }

  get hideMenuAfterNavigation() {
    return this.menuMode() === 'overlap' || this.temporaryMenuOpened();
  }

  get showMenuAfterClick() {
    return !this.menuOpened();
  }

  navigationChanged(event: DxTreeViewTypes.ItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (path && this.menuOpened()) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened.set(false);
        this.menuOpened.set(false);
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened.set(true);
      this.menuOpened.set(true);
    }
  }
}
