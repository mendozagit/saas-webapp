import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
  imports: [DxDropDownButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMenuComponent {
  readonly items = input<Array<{ text: string }>>();

  readonly visible = input(true);
}
