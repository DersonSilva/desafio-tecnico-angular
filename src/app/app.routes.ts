import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./features/users/components/user-list/user-list').then((m) => m.UserListComponent),
  },
  {
    path: '**',
    redirectTo: 'usuarios',
  },
];
