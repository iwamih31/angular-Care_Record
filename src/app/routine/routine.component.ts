import { Component } from '@angular/core';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { Routine } from '../routine';
import { RoutineService } from '../routine.service';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    RouterModule,
  ],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent {

  routine: Routine[] = [];

  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {
    this.getRoutine();
  }

  getRoutine(): void {
    this.routineService.getRoutine()
    .subscribe(routine => this.routine = routine);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.routineService.addRoutine({ name } as Routine)
    .subscribe(routine => {
      this.routine.push(routine);
    });
  }

  delete(user: Routine): void {
    this.routine = this.routine.filter(h => h !== user);
    this.routineService.deleteRoutine(user.id).subscribe();
  }

}
