import { Component, Output, EventEmitter, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
})
export class SearchUserComponent {
  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('');
  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.searchChange.emit(value || ''));
  }
}
