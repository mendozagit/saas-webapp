import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewChild
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormComponent,
  DxFormModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidatorModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { ApplyPipeDirective } from 'src/app/pipes/apply.pipe';
import { PicturedItemSelectBoxComponent } from 'src/app/components/library/pictured-item-select-box/pictured-item-select-box.component';
import { ScreenService } from 'src/app/services';
import { StatusSelectBoxComponent } from 'src/app/components/library/status-select-box/status-select-box.component';
import { getSizeQualifier } from 'src/app/services/screen.service';

type CardData = Record<string, any>;

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ApplyPipeDirective,
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxTextBoxModule,
    DxValidatorModule,
    AsyncPipe,
    PicturedItemSelectBoxComponent,
    StatusSelectBoxComponent,
  ],
})
export class ProfileCardComponent {
  @ViewChild('form', { static: true }) form: DxFormComponent;

  readonly items = input<Record<string, any>[]>([]);

  readonly colCount = input(2);

  readonly title = input('');

  readonly dataChanged = output<any>();

  readonly cardData = input<CardData>();

  getSizeQualifier = getSizeQualifier;

  assign = Object.assign;

  public screen = inject(ScreenService);

  onFieldChange(fieldName?, value?) {
    const {isValid} = this.form.instance.validate();

    if (!isValid) {
      return;
    }

    if (fieldName) {
      this.cardData()[fieldName] = value;
    }

    this.dataChanged.emit(this.cardData());
  }
}
