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
  date = '2024/07/01';

  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {
    this.date = this.date.replaceAll('/', '');
    this.getRoutine();
  }

  getRoutine(): void {
    this.routineService.getRoutineList()
    .subscribe(routine => this.routine = routine);
  }

  add( 
    action: string,
    note: string,
    time: string,
  ): void {
    action = action.trim();
    note = note.trim();
    const date = this.date;
    time = time.trim();
    const userId = 0;
    if (!action) { return; }
    this.routineService.addRoutine({ action, note, date, time, userId } as Routine)
    .subscribe(routine => {
      this.routine.push(routine);
    } );
  }

  delete(user: Routine): void {
    this.routine = this.routine.filter(h => h !== user);
    this.routineService.deleteRoutine(user.id).subscribe();
  }

}
