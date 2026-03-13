import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  DxButtonModule,
  DxToolbarModule,
  DxPopupModule,
  DxValidationGroupModule,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { ScreenService } from 'src/app/services';
import { ApplyPipeDirective } from 'src/app/pipes/apply.pipe';

@Component({
  selector: 'form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ApplyPipeDirective,
    DxButtonModule,
    DxToolbarModule,
    DxPopupModule,
    DxValidationGroupModule,
    AsyncPipe,
  ],
})

export class FormPopupComponent {
  @ViewChild('validationGroup', { static: true }) validationGroup: DxValidationGroupComponent;

  readonly titleText = input('');

  readonly width = input(480);

  readonly height = input<string | number>('auto');

  readonly wrapperAttr = input<Record<string, string>>({});

  readonly visible = model(false);

  readonly isSaveDisabled = input(false);

  readonly save = output();

  protected screen = inject(ScreenService);

  isValid() {
    return this.validationGroup.instance.validate().isValid;
  }

  onSaveClick() {
    if(!this.isValid()) {
      return
    }

    this.save.emit();
    this.close();
  }

  close() {
    this.validationGroup.instance.reset();
    this.visible.set(false);
  }

  getWrapperAttrs = (inputWrapperAttr) => {
    return {
      ...inputWrapperAttr,
      class: `${inputWrapperAttr.class} form-popup`,
    };
  }
}
