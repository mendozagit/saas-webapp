import {
  ChangeDetectionStrategy, Component, OnInit, inject, input, output, signal,
} from '@angular/core';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { UserPanelComponent } from '../user-panel/user-panel.component';
import { AuthService, IUser } from 'src/app/services';
import { ThemeSwitcherComponent } from 'src/app/components/library/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxToolbarModule,
    ThemeSwitcherComponent,
    UserPanelComponent,
  ]
})
export class AppHeaderComponent implements OnInit {
  readonly menuToggle = output();

  readonly menuToggleEnabled = input(false);

  readonly title = input<string>();

  private authService = inject(AuthService);

  user = signal<IUser | null>({ email: '' });

  userMenuItems = [
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut();
      },
    }];

  ngOnInit() {
    this.authService.getUser().then((e) => this.user.set(e.data));
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };
}
