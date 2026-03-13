import {
  ChangeDetectionStrategy,
  Component,
  model,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorComponent,
  DxValidatorModule
} from 'devextreme-angular';
import { ValidationRule, EditorStyle } from 'devextreme-angular/common';

@Component({
  selector: 'password-text-box',
  templateUrl: 'password-text-box.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
  ]
})
export class PasswordTextBoxComponent {
  @ViewChild('validator', { static: true }) validator: DxValidatorComponent;

  readonly value = model<string>();

  readonly placeholder = input('');

  readonly stylingMode = input<EditorStyle>('outlined');

  readonly validators = input<ValidationRule[]>([]);

  readonly valueChanged = output<string>();

  readonly isPasswordMode = signal(true);

  switchMode = () => {
    this.isPasswordMode.update(v => !v);
  }

  onValueChange(value: string) {
    this.value.set(value);
    this.valueChanged.emit(value);
  }

  revalidate() {
    this.validator?.instance.validate();
  }
}
