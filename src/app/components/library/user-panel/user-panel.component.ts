import { ChangeDetectionStrategy, Component, input, ViewChild } from '@angular/core';

import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { UserMenuSectionComponent } from '../user-menu-section/user-menu-section.component';
import { IUser } from '../../../services/auth.service';
@Component({
  selector: 'user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  imports: [
    DxDropDownButtonModule,
    UserMenuSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserPanelComponent {
  readonly menuItems = input<any[]>();

  readonly menuMode = input<string>();

  readonly user = input<IUser | null>();

  @ViewChild(UserMenuSectionComponent) userMenuSection: UserMenuSectionComponent;

  handleDropDownButtonContentReady({ component }) {
    component.registerKeyHandler('downArrow', () => {
      this.userMenuSection.userInfoList.nativeElement.focus();
    });
  }
}
