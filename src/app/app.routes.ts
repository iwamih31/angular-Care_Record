import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ActionComponent } from './action/action.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'users', component: UsersComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: UserDetailComponent },
	{ path: 'action/:id', component:ActionComponent },
];