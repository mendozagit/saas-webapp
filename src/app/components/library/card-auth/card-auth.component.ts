import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAuthComponent {
  readonly title = input.required<string>();

  readonly description = input('');
}
