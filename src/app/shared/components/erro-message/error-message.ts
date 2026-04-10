import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type MessageType = 'error' | 'warning' | 'info';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.html',
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() type: MessageType = 'error';

  get classes(): string {
    switch (this.type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  }
}
