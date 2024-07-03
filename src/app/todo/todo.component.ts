import {Component, Input} from '@angular/core';
import { NgIf, UpperCasePipe, Location,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


import {User} from '../user';

@Component({
  selector: 'app-todo',
  standalone: true,
    imports: [
    NgIf,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class ToDoComponent {
  @Input() user?: User;

  constructor(
		private readonly route: ActivatedRoute,
		private userService: UserService,
		private location: Location,
	) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

	goBack(): void {
		this.location.back();
	}

	save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }
}
