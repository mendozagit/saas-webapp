import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';
import { DxFileUploaderComponent } from 'devextreme-angular';

@Component({
  selector: 'form-photo',
  templateUrl: './form-photo.component.html',
  styleUrls: ['./form-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxFileUploaderComponent,
  ],
})
export class FormPhotoComponent {
  readonly link = input<string>();

  readonly editable = input(false);

  readonly size = input(124);

  private elRef = inject(ElementRef);

  readonly imageUrl = computed(() => `url('data:image/png;base64,${this.link()}')`);

  hostRef = this.elRef.nativeElement;
}
