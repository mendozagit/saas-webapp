import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxButtonComponent } from "devextreme-angular";
import { DxButtonTypes } from 'devextreme-angular/ui/button';

@Component({
  selector: 'toolbar-form',
  templateUrl: './toolbar-form.component.html',
  styleUrls: ['./toolbar-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxToolbarModule,
    DxButtonComponent,
  ],
})
export class ToolbarFormComponent {
  readonly isEditing = input<boolean>();

  readonly titleClass = input<string>();

  readonly editModeToggled = output();

  readonly saveButtonClicked = output<DxButtonTypes.ClickEvent>();

  readonly editingCancelled = output();

  handleCancelEditClick () {
    this.editingCancelled.emit();
  }

  handleEditClick () {
    this.editModeToggled.emit();
  }

  handleSaveButtonClick (event) {
    this.saveButtonClicked.emit(event);
  }
}
