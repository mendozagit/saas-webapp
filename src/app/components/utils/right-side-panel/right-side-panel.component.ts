import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
  inject,
} from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular';
import { DataService, ScreenService } from 'src/app/services';

@Component({
  selector: 'right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
  imports: [
    DxButtonComponent,
  ],
  host: {
    '[class.overlapping]': '!isLarge()',
    '[class.closed-state-hidden]': '!showOpenButton()',
    '[class.open]': 'isOpened()',
  },
})
export class RightSidePanelComponent {
  readonly isOpened = model(false);

  readonly showOpenButton = input(true);

  readonly title = input('');

  private screen = inject(ScreenService);

  readonly isLarge = signal(this.screen.sizes['screen-large']);

  constructor() {
    this.screen.screenChanged.subscribe(({isLarge, isXLarge}) => {
      this.isLarge.set(isLarge || isXLarge);
    });
  }

  toggleOpen = () => {
    this.isOpened.update(v => !v);
  };
}
