import { Component, OnInit } from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { UserSearchComponent } from "../user-search/user-search.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NgFor, RouterLink, RouterModule, UserSearchComponent]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUseres();
  }

  getUseres(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.slice(0, 10));
  }

}
