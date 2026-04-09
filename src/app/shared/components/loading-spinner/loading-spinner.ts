import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="flex justify-center p-10">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
