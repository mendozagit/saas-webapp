import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardAuthComponent, LoginFormComponent } from 'src/app/components';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoginFormComponent,
    CardAuthComponent,
  ]
})
export class AppSignInComponent {
}

