import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from "@angular/router";

import { DxHttpModule } from "devextreme-angular/http";

import { ScreenService, ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cssClass',
  },
  imports: [
    DxHttpModule,
    RouterModule,
  ]
})
export class AppComponent implements OnDestroy {
  private themeService =  inject(ThemeService);
  private screen = inject(ScreenService);

  get cssClass() {
    const classes = Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]);
    classes.push(this.themeService.currentTheme);
    return classes.join(' ');
  }

  constructor() {
    this.themeService.setAppTheme();
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
