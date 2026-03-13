import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CardAuthComponent } from '../../components/library/card-auth/card-auth.component'

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxScrollViewModule,
    CardAuthComponent,
  ],
})
export class SingleCardComponent {
  readonly title = input<string>();

  readonly description = input<string>();
}

