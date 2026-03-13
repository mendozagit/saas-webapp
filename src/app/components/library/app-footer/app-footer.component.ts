import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer><ng-content></ng-content></footer>`,
  styleUrls: ['./app-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppFooterComponent {

}
