import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'pictured-item-select-box',
  templateUrl: 'pictured-item-select-box.component.html',
  styleUrls: ['./pictured-item-select-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
  ],
})
export class PicturedItemSelectBoxComponent {
  readonly value = input<Record<string, unknown>>();

  readonly label = input('');

  readonly items = input<Record<string, unknown>[]>([]);

  readonly valueChange = output<string>();
}
