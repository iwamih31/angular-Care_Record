import { Component, OnInit } from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { UserSearchComponent } from "../user-search/user-search.component";

import { Action } from '../action';
import { ActionService } from '../action.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NgFor, RouterLink, RouterModule, UserSearchComponent]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  actions: Action[] = [];

  constructor(
    private userService: UserService,
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.getUseres();
    this.getActions('2024/06/15');
  }

  getUseres(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users.slice(0, 10)
    );
  }

  getActions(date: string): void {
    this.actionService.getActions(date).subscribe(
      actions => this.actions = actions.slice(0, 10)
    );
  }

}
