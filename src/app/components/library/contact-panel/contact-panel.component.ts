import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  DxAccordionModule,
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxFormModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import {
  FormTextboxComponent,
  FormPhotoComponent,
  ContactStatusComponent,
  CardActivitiesComponent,
} from 'src/app/components';
import { ScreenService, DataService } from 'src/app/services';
import { distinctUntilChanged, Subject, Subscription} from 'rxjs';
import { Contact } from 'src/app/types/contact';

@Component({
  selector: 'contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
  imports: [
    DxAccordionModule,
    DxButtonModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxFormModule,
    DxValidatorModule,
    DxValidationGroupModule,
    FormTextboxComponent,
    FormPhotoComponent,
    CardActivitiesComponent,
    ContactStatusComponent,
    CurrencyPipe,
  ]
})
export class ContactPanelComponent implements OnInit, AfterViewChecked, OnDestroy {
  readonly isOpened = model(false);

  readonly userId = input<number>();

  readonly pinnedChange = output<boolean>();

  private pinEventSubject = new Subject<boolean>();

  private screen = inject(ScreenService);

  private service = inject(DataService);

  private router = inject(Router);

  formData: Contact;

  contactData: Contact;

  readonly pinned = signal(false);

  readonly isLoading = signal(true);

  readonly isEditing = signal(false);

  readonly isPinEnabled = signal(false);

  userPanelSubscriptions: Subscription[] = [];

  constructor() {
    this.userPanelSubscriptions.push(
      this.screen.changed.subscribe(this.calculatePin),
      this
        .pinEventSubject
        .pipe(distinctUntilChanged())
        .subscribe((val) => this.pinnedChange.emit(val))
    );

    effect(() => {
      const id = this.userId();
      if (id) {
        this.loadUserById(id);
      }
    });
  }

  ngOnInit(): void {
    this.calculatePin();
  }

  ngAfterViewChecked(): void {
    this.pinEventSubject.next(this.pinned());
  }

  ngOnDestroy(): void {
    this.userPanelSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadUserById = (id: number) => {
    this.isLoading.set(true);

    this.service.getContact(id).subscribe((data) => {
      this.formData = data;
      this.contactData = { ...this.formData };
      this.isLoading.set(false);
      this.isEditing.set(false);
    })
  };

  onClosePanel = () => {
    this.isOpened.set(false);
    this.pinned.set(false);
  };

  onPinClick = () => {
    this.pinned.update((v) => !v);
  };

  onSaveClick = ({ validationGroup } : DxButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    this.contactData = { ...this.formData };
    this.isEditing.update((v) => !v);
  }

  calculatePin = () => {
    this.isPinEnabled.set(this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium']);
    if (this.pinned() && !this.isPinEnabled()) {
      this.pinned.set(false);
    }
  };

  toggleEdit = () => {
    this.isEditing.update((v) => !v);
  };

  cancelHandler() {
    this.toggleEdit();
    this.formData = { ...this.contactData };
  }

  navigateToDetails = () => {
    this.router.navigate(['/crm-contact-details'], {
      queryParams: { id: this.contactData.id }
    });
  }
}
