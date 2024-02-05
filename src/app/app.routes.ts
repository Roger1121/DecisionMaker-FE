import {Routes} from '@angular/router';
import {ProblemDetailsComponent} from "./problem/problem-details/problem-details.component";
import {ProblemListComponent} from "./problem/problem-list/problem-list.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'problem', component: ProblemListComponent},
  {path: 'problem/:id', component: ProblemDetailsComponent}
];
