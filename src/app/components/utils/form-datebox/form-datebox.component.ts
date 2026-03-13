import { ChangeDetectionStrategy, Component, input, model, ViewChild } from '@angular/core';
import { DxDateBoxComponent, DxDropDownButtonComponent } from 'devextreme-angular';

@Component({
  selector: 'form-item-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dx-date-box
      [(value)]="value"
      [readOnly]="!isEditing()"
      [label]="label()"
      [elementAttr]="{class: 'form-editor'}"
      [inputAttr]="{class: 'form-editor-input'}"
      stylingMode="filled"
      placeholder="MM/dd/y"
      displayFormat="MM/dd/y"
      pickerType="calendar"
    ></dx-date-box>`,
  imports: [
    DxDateBoxComponent,
  ],
})
export class FormDateboxComponent {
  @ViewChild(DxDropDownButtonComponent) dropDownButtonComponent: DxDropDownButtonComponent;

  readonly isEditing = input(false);

  readonly label = input('');

  readonly value = model<string | Date | number>();
}
