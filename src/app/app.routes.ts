import {Routes} from '@angular/router';
import {ProblemDetailsComponent} from "./problem/admin/problem-details/problem-details.component";
import {ProblemListComponent} from "./problem/admin/problem-list/problem-list.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {AvailableListComponent} from "./problem/user/available-list/available-list.component";
import {CriteriaWeightsComponent} from "./criterion/user/criteria-weights/criteria-weights.component";
import {HellwigComponent} from "./solve/hellwig/hellwig.component";
import {TopsisComponent} from "./solve/topsis/topsis.component";
import {IdealSolutionComponent} from "./solve/hellwig/ideal-solution/ideal-solution.component";
import {HellwigResultComponent} from "./solve/hellwig/hellwig-result/hellwig-result.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'problem', component: ProblemListComponent},
  {path: 'problem/available', component: AvailableListComponent},
  {path: 'problem/:id', component: ProblemDetailsComponent},
  {path: 'criteria/weights/:problemId', component: CriteriaWeightsComponent},
  {path: 'solve/hellwig/:problemId', component: HellwigComponent},
  {path: 'solve/hellwig/ideal/:problemId', component: IdealSolutionComponent},
  {path: 'solve/hellwig/results/:problemId', component: HellwigResultComponent},
  {path: 'solve/topsis/:problemId', component: TopsisComponent},
];
