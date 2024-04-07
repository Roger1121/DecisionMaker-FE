import {Component} from '@angular/core';
import {AvailableDetailsComponent} from "../../../problem/user/available-details/available-details.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Criterion} from "../../../shared/model/criterion";
import {CriterionOption} from "../../../shared/model/criterion-option";
import {ProblemService} from "../../../problem/problem.service";
import {CriterionService} from "../../../criterion/criterion.service";
import {UserService} from "../../../user/user.service";
import {AhpService} from "../ahp.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OptionComparison} from "../../../shared/model/option-comparison";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'app-option-comparison',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './option-comparison.component.html',
  styleUrl: './option-comparison.component.css'
})
export class OptionComparisonComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  critOptions: CriterionOption[] = [];
  scaleType: number = 0;
  reverseArray: boolean[][][] = [];

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private userService: UserService,
              private ahpService: AhpService,
              private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('problemId');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.userService.checkUserGroup().subscribe(data => {
          if ((data + this.problem.group) % 2 === 1) {
            this.eventService.emit("alert-warning", "Dla obecnego problemu decyzyjnego nie jest dostępne rozwiązywanie metodą AHP");
            this.router.navigate(['/problem/available']).then();
          } else {
            this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => {
              this.criteria = criteria;
              for (let criterion of this.criteria) {
                this.criteriaService.getCriterionOptions(criterion.id).subscribe((data: any) => {
                  this.critOptions.push(...(data as CriterionOption[]));
                  this.reverseArray.push([]);
                  let c = this.reverseArray.length - 1;
                  for (let i = 0; i < this.critOptions.length; i++) {
                    this.reverseArray[c].push([]);
                    for (let j = 0; j < this.critOptions.length; j++) {
                      this.reverseArray[c][i].push(false);
                    }
                  }
                }, (error) => {
                  this.eventService.emit("alert-error", error.error);
                });
              }
            }, (error) => {
              this.eventService.emit("alert-error", error.error);
            });
            this.userService.checkScaleType().subscribe((scaleType: any) => {
              this.scaleType = scaleType;
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

  getScaleType() {
    return this.scaleType === 0;
  }

  getDescriptiveValues(): OptionComparison[] {
    let weightList: OptionComparison[] = [];
    for (let criterion of this.criteria) {
      let options = this.getCriterionOptions(criterion.id)
      for (let optionA of options) {
        for (let optionB of options) {
          if (options.indexOf(optionB) > options.indexOf(optionA)) {
            for (let i = 1; i <= 9; i++) {
              let radio: any = document.getElementById("" + optionA.id?.toString(10) + optionB.id?.toString(10) + i.toString(10));
              if (radio.checked) {
                if (this.reverseArray[this.criteria.indexOf(criterion)][this.getCriterionOptions(criterion.id).indexOf(optionA)][this.getCriterionOptions(criterion.id).indexOf(optionA)]) {
                  weightList.push(new OptionComparison(optionB.id, optionA.id, radio.value));
                } else {
                  weightList.push(new OptionComparison(optionA.id, optionB.id, radio.value));
                }
              }
            }
          }
        }
      }
    }
    return weightList;
  }

  getNumericValues(): OptionComparison[] {
    let weightList: OptionComparison[] = [];
    for (let criterion of this.criteria) {
      let options = this.getCriterionOptions(criterion.id)
      for (let optionA of options) {
        for (let optionB of options) {
          if (options.indexOf(optionB) > options.indexOf(optionA)) {
            let slider: any = document.getElementById("" + optionA.id?.toString(10) + optionB.id?.toString(10));
            if (this.reverseArray[this.criteria.indexOf(criterion)][this.getCriterionOptions(criterion.id).indexOf(optionA)][this.getCriterionOptions(criterion.id).indexOf(optionA)]) {
              weightList.push(new OptionComparison(optionB.id, optionA.id, slider.value));
            } else {
              weightList.push(new OptionComparison(optionA.id, optionB.id, slider.value));
            }
          }
        }
      }
    }
    return weightList;
  }

  saveOptionComparison() {
    let comparisons: OptionComparison[];
    if (this.scaleType === 0) {
      comparisons = this.getNumericValues()
    } else {
      comparisons = this.getDescriptiveValues()
    }
    this.ahpService.saveOptionComparisons(comparisons).subscribe((data) => {
      this.eventService.emit("alert-success", data);
      this.router.navigate(['solve/ahp/results/' + this.problem.id]).then();
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    });
  }

  reverseItem(c: number, i: number, j: number) {
    this.reverseArray[c][i][j] = !this.reverseArray[c][i][j];
  }
}
