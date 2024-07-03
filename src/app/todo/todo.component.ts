import {Component, Input} from '@angular/core';
import { NgIf, UpperCasePipe, Location,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../user.service';


import {Action} from '../action';

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
  @Input() user?: Action;

  constructor(
		private readonly route: ActivatedRoute,
		private userService: ActionService,
		private location: Location,
	) {}

  ngOnInit(): void {
    this.getAction();
  }

  getAction(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getAction(id)
      .subscribe(user => this.user = user);
  }

	goBack(): void {
		this.location.back();
	}

	save(): void {
    if (this.user) {
      this.userService.updateAction(this.user)
        .subscribe(() => this.goBack());
    }
  }
}
