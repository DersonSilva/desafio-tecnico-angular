import { Injectable, signal, computed, inject } from '@angular/core';
import { User, UserState } from './user.model';
import { UserService } from '../../../core/services/user.service';
import { catchError, tap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService = inject(UserService);

  // State
  private state = signal<UserState>({
    users: [],
    loading: false,
    error: null,
    filter: '',
  });

  // Selectors (Computed)
  users = computed(() => {
    const filter = this.state().filter.toLowerCase();
    return this.state().users.filter((u) => u.name.toLowerCase().includes(filter));
  });

  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor() {
    this.loadUsers();
  }

  updateFilter(filter: string) {
    this.state.update((s) => ({ ...s, filter }));
  }

  loadUsers() {
    this.state.update((s) => ({ ...s, loading: true, error: null }));

    this.userService
      .getUsers()
      .pipe(
        tap((users) => this.state.update((s) => ({ ...s, users, loading: false }))),
        catchError((err) => {
          this.state.update((s) => ({ ...s, error: 'Erro ao carregar usuários', loading: false }));
          return of([]);
        }),
      )
      .subscribe(); // Aqui não precisa takeUntilDestroyed
  }
}
