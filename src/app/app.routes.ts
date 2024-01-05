import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"authenication",
    pathMatch: 'full'
  },
  {
    path:"authenication",
    component: AuthenticationComponent
  },
  {
    path:"todos",
    loadComponent: () => import('./todos/todos.component').then(m => m.TodosComponent),
    canActivate: [authGuard]
  }
];
