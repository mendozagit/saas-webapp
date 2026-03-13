import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { EditorStyle, LabelMode } from 'devextreme-angular/common';
import { contactStatusList } from 'src/app/types/contact';
import { ContactStatusComponent } from 'src/app/components/utils/contact-status/contact-status.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'status-select-box',
  templateUrl: 'status-select-box.component.html',
  styleUrls: ['./status-select-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactStatusComponent,
    LowerCasePipe,
  ],
})
export class StatusSelectBoxComponent {
  readonly value = model<string>();

  readonly label = input('');

  readonly items = input(contactStatusList);

  readonly readOnly = input(false);

  readonly stylingMode = input<EditorStyle>('filled');

  private theme = inject(ThemeService);

  readonly labelMode = input<LabelMode>(this.theme.isFluent() ? 'outside' : undefined);

  readonly classList = input<string>();
}

