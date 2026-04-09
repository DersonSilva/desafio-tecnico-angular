import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-red-100 text-red-700 p-4 rounded-md">
      {{ message }}
    </div>
  `,
})
export class ErrorMessageComponent {
  @Input() message = '';
}
