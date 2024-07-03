import {Component, Input} from '@angular/core';
import { NgIf, UpperCasePipe, Location,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutineService } from '../routine.service';


import {Routine} from '../routine';

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
  @Input() routine?: Routine;

  constructor(
		private readonly route: ActivatedRoute,
		private routineService: RoutineService,
		private location: Location,
	) {}

  ngOnInit(): void {
    this.getRoutine();
  }

  getRoutine(): void {
    const todoId = Number(this.route.snapshot.paramMap.get('todoId'));
    this.routineService.getToDo(todoId)
      .subscribe(routine => this.routine = routine);
  }

	goBack(): void {
		this.location.back();
	}

	save(): void {
    if (this.routine) {
      this.routineService.updateRoutine(this.routine)
        .subscribe(() => this.goBack());
    }
  }
}
