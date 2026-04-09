import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../features/users/store/user.model';
import { MOCK_USERS } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private STORAGE_KEY = 'users';

  // 🔥 GET USERS (com persistência)
  getUsers(): Observable<User[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    let users: User[];

    if (stored) {
      users = JSON.parse(stored);
    } else {
      users = [...MOCK_USERS];

      // salva inicial no storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    return of([...users]).pipe(delay(800));
  }

  // 🔥 SAVE USER (create + update)
  saveUser(user: User): Observable<User> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    let users: User[] = stored ? JSON.parse(stored) : [...MOCK_USERS];

    if (user.id) {
      const index = users.findIndex((u) => u.id === user.id);
      if (index > -1) {
        users[index] = { ...user };
      }
    } else {
      user.id = String(Date.now()); // 👈 evita duplicação
      users.push({ ...user });
    }

    // 🔥 salva no localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

    return of({ ...user }).pipe(delay(300));
  }
}
