import {Component} from '@angular/core';
import {Criterion} from "../../../shared/model/criterion";
import {CriterionOption} from "../../../shared/model/criterion-option";
import {ProblemService} from "../../../problem/problem.service";
import {CriterionService} from "../../../criterion/criterion.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AvailableDetailsComponent} from "../../../problem/user/available-details/available-details.component";
import {NgForOf} from "@angular/common";
import {IdealSolution} from "../../../shared/model/ideal-solution";
import {HellwigService} from "../hellwig.service";

@Component({
  selector: 'app-ideal-solution',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf
  ],
  templateUrl: './ideal-solution.component.html',
  styleUrl: './ideal-solution.component.css'
})
export class IdealSolutionComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  critOptions: CriterionOption[] = [];

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private hellwigService: HellwigService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('problemId');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => {
          this.criteria = criteria;
          for (let criterion of this.criteria) {
            this.criteriaService.getCriterionOptions(criterion.id).subscribe((data: any) => {
              this.critOptions.push(...(data as CriterionOption[]));
            })
          }
        });
      });
    });
  }

  getCriterionOptions(criterion_id: any) {
    return this.critOptions.filter(option => option.criterion === criterion_id)
  }

  saveIdealSolution() {
    for (let i = 0; i < this.criteria.length; i++) {
      let select: any = document.getElementById(i.toString(10));
      if (select.value === "default") {
        alert("Wszystkie kryteria powinny zostać uzupełnione.");
        return;
      }
    }
    let solutions: IdealSolution[] = [];
    for (let i = 0; i < this.criteria.length; i++) {
      let select: any = document.getElementById(i.toString(10));
      let solution = new IdealSolution(select.value as number);
      solutions.push(solution);
    }
    this.hellwigService.saveIdealSolutions(solutions).subscribe((response: any) => {
      this.router.navigate(['/solve/hellwig/results/'+this.problem.id]).then();
    }, (error) => {
      alert("Nie można zapisać wzorca rozwoju: " + error.error.res);
    })
  }
}
