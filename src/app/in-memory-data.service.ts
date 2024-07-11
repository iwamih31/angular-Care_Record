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
    const actions = [
      { id: 1, action: '排尿', note: 'パ中', date: '2024/06/01', time: '07:30', userId: 12 },
      { id: 2, action: '排便', note: 'オ軟中', date: '2024/06/01', time: '08:30', userId: 13 },
      { id: 3, action: '排尿', note: 'ト中', date: '2024/06/01', time: '08:30', userId: 12 },
      { id: 4, action: '水分', note: '40', date: '2024/06/01', time: '09:00', userId: 12 },
      { id: 5, action: '排尿', note: 'ト中', date: '2024/06/01', time: '10:00', userId: 12 },
      { id: 6, action: '排尿', note: 'ト中', date: '2024/06/01', time: '12:00', userId: 12 },
      { id: 7, action: '水分', note: '20', date: '2024/06/01', time: '14:30', userId: 12 },
      { id: 8, action: '排便', note: 'ト普少', date: '2024/06/01', time: '15:00', userId: 12 },
      { id: 9, action: '水分', note: '40', date: '2024/06/02', time: '17:30', userId: 12 }
    ];
        const routine = [
      { id: 1, action: '起床', note: '起床した時刻', date: '予定', time: '07:30', userId: 0 },
      { id: 2, action: '整容', note: '歯磨き、洗顔', date: '予定', time: '08:30', userId: 0 },
      { id: 3, action: '水分', note: '朝一の水分補給', date: '予定', time: '08:30', userId: 0 },
      { id: 4, action: '朝食', note: '食事の状態確認', date: '予定', time: '09:00', userId: 0 },
      { id: 5, action: '体操', note: '体操内容確認', date: '予定', time: '10:00', userId: 0 },
      { id: 6, action: '昼食', note: '食事の状態確認', date: '予定', time: '12:00', userId: 0 },
      { id: 7, action: '運動', note: '運動の様子確認', date: '予定', time: '14:30', userId: 0 },
      { id: 8, action: 'おやつ', note: '食事の状態確認', date: '予定', time: '15:00', userId: 0 },
      { id: 9, action: '夕食', note: '食事の状態確認', date: '予定', time: '17:30', userId: 0 },
      { id: 10, action: '就寝', note: '消灯した時刻', date: '予定', time: '19:30', userId: 0 }
    ];
    return {users, actions, routine};
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