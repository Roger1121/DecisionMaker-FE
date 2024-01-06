import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProblemDetailsComponent} from "./problem/problem-details/problem-details.component";
import {ProblemListComponent} from "./problem/problem-list/problem-list.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'problem', component: ProblemListComponent},
  {path: 'problem/:id', component: ProblemDetailsComponent}
];
