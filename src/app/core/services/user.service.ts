import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../../features/users/store/user.model';
import { MOCK_USERS } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of([...MOCK_USERS]).pipe(delay(800)); // 👈 cópia
  }

  saveUser(user: User): Observable<User> {
    if (user.id) {
      const index = MOCK_USERS.findIndex((u) => u.id === user.id);
      if (index > -1) {
        MOCK_USERS[index] = { ...user }; // 👈 evita referência
      }
    } else {
      user.id = String(MOCK_USERS.length + 1);
      MOCK_USERS.push({ ...user }); // 👈 cópia
    }

    return of({ ...user }).pipe(delay(200));
  }
}
