import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './fab-button.html',
})
export class FabButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  @Input() icon: string = 'add';
}
