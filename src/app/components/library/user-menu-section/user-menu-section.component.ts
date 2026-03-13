import { ChangeDetectionStrategy, Component, input, ViewChild, ElementRef } from '@angular/core';

import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
import { IUser } from '../../../services/auth.service';

@Component({
  selector: 'user-menu-section',
  templateUrl: 'user-menu-section.component.html',
  styleUrls: ['./user-menu-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ DxListModule ]
})
export class UserMenuSectionComponent {
  readonly menuItems = input<any>();

  readonly showAvatar = input.required<boolean>();

  readonly user = input.required<IUser | null>();

  @ViewChild('userInfoList', { read: ElementRef }) userInfoList: ElementRef<HTMLElement>;

  handleListItemClick(e: DxListTypes.ItemClickEvent) {
    e.itemData?.onClick();
  }
}
