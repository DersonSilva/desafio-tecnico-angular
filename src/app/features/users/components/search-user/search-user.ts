import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
})
export class SearchUserComponent {
  searchControl = new FormControl('');

  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.searchChange.emit(value || ''));
  }
}
