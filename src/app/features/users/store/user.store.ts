import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../services/user.service';
import { catchError, tap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService = inject(UserService);

  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  users = computed(() => this._users());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  loadUsers() {
    this._loading.set(true);
    this._error.set(null);

    this.userService
      .getUsers()
      .pipe(
        tap((users) => {
          this._users.set(users);
          this._loading.set(false);
        }),
        catchError(() => {
          this._error.set('Erro ao carregar usuários');
          this._loading.set(false);
          return of([]);
        }),
      )
      .subscribe();
  }

  saveUser(user: User) {
    this._loading.set(true);

    return this.userService.saveUser(user).pipe(
      tap(() => this.loadUsers()),
      catchError(() => {
        this._error.set('Erro ao salvar usuário');
        this._loading.set(false);
        return of(null);
      }),
    );
  }
}
