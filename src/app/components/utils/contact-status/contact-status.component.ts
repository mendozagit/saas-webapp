import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ContactStatus } from 'src/app/types/contact';

@Component({
  selector: 'contact-status',
  template: `
    <span class="status status-{{ value() | lowercase }}">{{ showText() ? value() : '' }}</span>
  `,
  styleUrls: ['./contact-status.component.scss'],
  imports: [ LowerCasePipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactStatusComponent {
  readonly value = input<ContactStatus>();

  readonly showText = input(true);
}

