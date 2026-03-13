import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { ThemeService } from 'src/app/services';

@Component({
  selector: 'theme-switcher',
  template: `
    <dx-button
      class="theme-button"
      stylingMode="text"
      [icon]="themeService.currentTheme !== 'dark' ? 'moon' : 'sun'"
      (onClick)="onButtonClick()"
    ></dx-button>
  `,
  imports: [ DxButtonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  protected themeService = inject(ThemeService);

  onButtonClick () {
    this.themeService.switchTheme();
  }
}

