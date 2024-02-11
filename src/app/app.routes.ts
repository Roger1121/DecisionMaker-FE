import {Routes} from '@angular/router';
import {ProblemDetailsComponent} from "./problem/admin/problem-details/problem-details.component";
import {ProblemListComponent} from "./problem/admin/problem-list/problem-list.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {AvailableListComponent} from "./problem/user/available-list/available-list.component";
import {CriteriaWeightsComponent} from "./criterion/user/criteria-weights/criteria-weights.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'problem', component: ProblemListComponent},
  {path: 'problem/available', component: AvailableListComponent},
  {path: 'problem/:id', component: ProblemDetailsComponent},
  {path: 'criteria/weights/:problemId', component: CriteriaWeightsComponent}
];
