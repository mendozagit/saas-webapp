import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CardAuthComponent,
  CreateAccountFormComponent,
} from 'src/app/components';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardAuthComponent,
    CreateAccountFormComponent
  ]
})
export class AppRegisterComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/register-form';

  constructor() { }
}

