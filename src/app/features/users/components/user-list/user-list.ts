import { Component, DestroyRef, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User } from '../../store/user.model';
import { UserService } from '../../../../core/services/user.service';

import { UserCardComponent } from '../user-card/user-card';
import { SearchUserComponent } from '../search-user/search-user';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../../shared/components/erro-message/erro-message';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    UserCardComponent,
    SearchUserComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    MatDialogModule, // 👈 ESSENCIAL
  ],
  templateUrl: './user-list.html',
})
export class UserListComponent {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  // STATE (Signals)
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  // FILTRO (reactivo)
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.users().filter((user) => user.name.toLowerCase().includes(term));
  });

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Erro ao carregar usuários');
          this.loading.set(false);
        },
      });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }

  onOpenModal(user?: User) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '700px', // 👈 MAIS LARGO
      maxWidth: '90vw', // 👈 responsivo
      panelClass: 'custom-dialog',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.saveUser(result).subscribe(() => this.loadUsers());
      }
    });
  }
}
