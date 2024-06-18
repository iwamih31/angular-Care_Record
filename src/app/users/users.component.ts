import { Component } from '@angular/core';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        UpperCasePipe,
        RouterModule,
    ]
})
export class UsersComponent {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.userService.addUser({ name } as User)
    .subscribe(user => {
      this.users.push(user);
    });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user.id).subscribe();
  }

}
