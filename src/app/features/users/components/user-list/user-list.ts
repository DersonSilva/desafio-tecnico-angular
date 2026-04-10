import { Component, DestroyRef, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../store/user.model';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card';
import { SearchUserComponent } from '../search-user/search-user';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../../shared/components/erro-message/error-message';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FabButtonComponent } from '../../../../shared/components/fab-button/fab-button';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    UserCardComponent,
    SearchUserComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    MatDialogModule,
    MatSnackBarModule,
    FabButtonComponent,
  ],
  templateUrl: './user-list.html',
})
export class UserListComponent {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private breakpoint = inject(BreakpointObserver);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  pageIndex = signal(0);
  pageSize = signal(5);

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter((user) => user.name.toLowerCase().includes(term));
  });

  // 📄 PAGINAÇÃO
  paginatedUsers = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredUsers().slice(start, end);
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

          this.snackBar.open('Erro ao carregar usuários', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['bg-red-500', 'text-white'],
          });
        },
      });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onOpenModal(user?: User) {
    const isMobile = this.breakpoint.isMatched('(max-width: 640px)');

    const dialogRef = this.dialog.open(UserModalComponent, {
      width: isMobile ? '95vw' : '700px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const isEdit = !!user;

        this.userService.saveUser(result).subscribe({
          next: () => {
            this.loadUsers();

            this.snackBar.open(
              isEdit ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!',
              'OK',
              {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['success-snackbar'],
              },
            );
          },
          error: () => {
            this.snackBar.open('Erro ao salvar usuário', 'Fechar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
