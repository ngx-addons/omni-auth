import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'omni-auth-ui-mat-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: 'loader.component.scss',
})
export class LoaderComponent {
  verticalCenter = input(false);
}
