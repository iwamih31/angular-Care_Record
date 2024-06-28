import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ActionService } from '../action.service';
import { Action } from '../action';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, AsyncPipe, FormsModule],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent implements OnInit {
  userId = 0;
  date: string = '';
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();
  actions: Action[] = [];
  action = '';
  

  constructor(
    private readonly route: ActivatedRoute,
    private userService: UserService,
    private actionService: ActionService,
  ) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.getActions();
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.date = '2024/06/01';
    this.users$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  getActions(): void {
    this.actionService.getActions().subscribe(
      actions => {
        this.actions = actions
      }
    );
  }

  
  add( 
    action: string,
    note: string,
    date: string,
    time: string,
    userId: number
  ): void {
  action = action.trim();
  note = note.trim();
  date = date.trim();
  time = time.trim();
  if (!action) { return; }
  this.actionService.addAction({ action, note, date, time, userId } as Action)
    .subscribe(action => {
      this.actions.push(action);
    });
  }

}
