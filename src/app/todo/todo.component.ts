import {Component, Input} from '@angular/core';
import { NgFor, NgIf, UpperCasePipe, Location,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutineService } from '../routine.service';


import {Routine} from '../routine';

@Component({
  selector: 'app-todo',
  standalone: true,
    imports: [
    NgFor,
    NgIf,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() routine?: Routine[];

  constructor(
		private readonly route: ActivatedRoute,
		private routineService: RoutineService,
		private location: Location,
	) {}

  ngOnInit(): void {
    this.getToDo();
  }

    getToDo(): void {
    const action = this.route.snapshot.paramMap.get('action');
    const date = this.route.snapshot.paramMap.get('date');
  if (action !== null && date !== null)
    this.routineService.getRoutine(action, date)
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
