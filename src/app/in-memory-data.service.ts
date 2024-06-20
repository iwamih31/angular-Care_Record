import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 12, name: 'Dr. Nice', level: '介護1' },
      { id: 13, name: 'Bombasto', level: '介護2' },
      { id: 14, name: 'Celeritas', level: '介護3' },
      { id: 15, name: 'Magneta', level: '介護4' },
      { id: 16, name: 'RubberMan', level: '介護5' },
      { id: 17, name: 'Dynama', level: '支援1' },
      { id: 18, name: 'Dr. IQ', level: '支援2' },
      { id: 19, name: 'Magma', level: '介護1' },
      { id: 20, name: 'Tornado', level: '介護2' }
    ];
    return {users};
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the users array is empty,
  // the method below returns the initial number (11).
  // if the users array is not empty, the method below returns the highest
  // user id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}