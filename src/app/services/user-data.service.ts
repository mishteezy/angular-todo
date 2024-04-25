import { Injectable } from '@angular/core';

import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  users = [
    'Alex',
    'Michael',
    'John',
    'Ivan',
    'Petr',
    'Nastya',
    'Ksyusha',
    'Olya',
    'Vika',
  ];

  setUsers() {
    localStorage.setItem('userList', JSON.stringify(this.users));
  }

  getList(): Observable<string[]> {
    return of(JSON.parse(localStorage.getItem('userList') || '[]')).pipe(
      delay(100)
    );
  }
}
