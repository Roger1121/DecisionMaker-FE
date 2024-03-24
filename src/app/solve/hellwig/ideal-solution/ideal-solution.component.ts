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
import {EventService} from "../../../shared/services/EventService";
import {UserService} from "../../../user/user.service";

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
              private router: Router,
              private eventService: EventService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('problemId');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.userService.checkUserGroup().subscribe(data => {
          if((data + this.problem.group) % 2 === 0){
            this.eventService.emit("alert-warning", "Dla obecnego problemu decyzyjnego nie jest dostępne rozwiązywanie metodą Hellwiga");
            this.router.navigate(['/problem/available']).then();
          } else {
            this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => {
              this.criteria = criteria;
              for (let criterion of this.criteria) {
                this.criteriaService.getCriterionOptions(criterion.id).subscribe((data: any) => {
                  this.critOptions.push(...(data as CriterionOption[]));
                }, (error) => {
                  this.eventService.emit("alert-error", error.error);
                });
              }
            }, (error) => {
              this.eventService.emit("alert-error", error.error);
            });
          }
        }, (error) => {
          this.eventService.emit("alert-error", error.error);
        });
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
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
        this.eventService.emit("alert-error", "Wszystkie kryteria powinny zostać uzupełnione");
        return;
      }
    }
    let solutions: IdealSolution[] = [];
    for (let i = 0; i < this.criteria.length; i++) {
      let select: any = document.getElementById(i.toString(10));
      let solution = new IdealSolution(select.value as number);
      solutions.push(solution);
    }
    this.hellwigService.saveIdealSolutions(solutions).subscribe((data) => {
      this.eventService.emit("alert-success", data);
      this.router.navigate(['/solve/hellwig/results/'+this.problem.id]).then();
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    })
  }
}
