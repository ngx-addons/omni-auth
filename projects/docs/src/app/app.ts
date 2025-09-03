import {
  NgDocNavbarComponent,
  NgDocRootComponent,
  NgDocSidebarComponent,
  NgDocThemeToggleComponent,
} from '@ng-doc/app';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { preventInitialChildAnimations } from '@ng-doc/ui-kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  animations: [preventInitialChildAnimations],
  imports: [
    RouterOutlet,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
    NgDocThemeToggleComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
