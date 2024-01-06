import { Routes } from '@angular/router';
import {ProblemComponent} from "./problem/problem.component";
import {HomeComponent} from "./home/home.component";
import {ProblemDetailsComponent} from "./problem/problem-details/problem-details.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'problem', component: ProblemComponent},
  {path: 'problem/:id', component: ProblemDetailsComponent}
];
