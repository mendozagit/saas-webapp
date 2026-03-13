import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss'],
  imports: [
    DxButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginOauthComponent {
  private themeService = inject(ThemeService);

  readonly btnStylingMode = signal<DxButtonTypes.ButtonStyle>('contained');

  constructor() {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode.set(value ? 'outlined' : 'contained');
    });
  }
}
