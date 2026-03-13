import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
  DxButtonModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { Notes, Note } from 'src/app/types/notes';

@Component({
  selector: 'card-notes',
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
  imports: [
    DxTextAreaModule,
    DxToolbarModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxScrollViewModule,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNotesComponent {
  readonly user = input<string>();

  readonly items = input<Notes>();

  nodeText = '';

  add = (e: { validationGroup: { validate: () => { isValid: boolean }; reset: () => void } }) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newNote: Note = {
      manager: this.user()!,
      date: new Date(),
      text: this.nodeText,
    };

    this.items()!.push(newNote);

    e.validationGroup.reset();
  };
}
