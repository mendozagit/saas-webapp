import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import { ValidationRule } from 'devextreme-angular/common';

@Component({
  selector: 'form-textbox',
  templateUrl: './form-textbox.component.html',
  styleUrls: ['form-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
  ],
})
export class FormTextboxComponent {
  readonly isEditing = input(false);

  readonly text = input<string>();

  readonly label = input('');

  readonly mask = input<string | null>(null);

  readonly icon = input<string | null>(null);

  readonly validators = input<ValidationRule[]>([{ type: 'required' }]);

  readonly value = model<string>('');
}
