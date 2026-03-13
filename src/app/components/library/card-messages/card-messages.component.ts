import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  DxTextAreaModule,
  DxTextBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxFileUploaderModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { Message, Messages } from 'src/app/types/messages';
import { UserAvatarComponent } from 'src/app/components/library/user-avatar/user-avatar.component';

@Component({
  selector: 'card-messages',
  templateUrl: './card-messages.component.html',
  styleUrls: ['./card-messages.component.scss'],
  imports: [
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    UserAvatarComponent,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMessagesComponent {
  readonly user = input<string>();

  readonly items = input<Messages>();

  messageTitle = '';

  messageText = '';

  getAvatarText(name: string) {
    return name.split(' ').map((name) => name[0]).join('');
  }

  getText(data: Message) {
    const items = this.items()!;
    return data.text.replace('{username}',  data.manager !== items[0].manager ? items[0].manager : items[1].manager);
  }

  send = (e: unknown) => {
    const event = e as { validationGroup: { validate: () => { isValid: boolean }; reset: () => void } };
    if (!event.validationGroup.validate().isValid) {
      return;
    }

    const newMessage: Message = {
      subject: this.messageTitle,
      text: this.messageText,
      manager: this.user()!,
      date: new Date(),
    };

    this.items()!.push(newMessage);

    event.validationGroup.reset();
  };
}
