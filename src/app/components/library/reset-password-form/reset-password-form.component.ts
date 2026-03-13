import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse } from 'src/app/services';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
  ]
})
export class ResetPasswordFormComponent implements OnInit {
  readonly signInLink = input('/auth/sign-in');

  readonly buttonLink = input('/auth/sign-in');

  private authService = inject(AuthService);

  private router = inject(Router);

  defaultAuthData: IResponse;

  readonly loading = signal(false);

  formData: any = {};

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading.set(true);

    const result = await this.authService.resetPassword(email);
    this.loading.set(false);

    if (result.isOk) {
      this.router.navigate([this.buttonLink()]);
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}
