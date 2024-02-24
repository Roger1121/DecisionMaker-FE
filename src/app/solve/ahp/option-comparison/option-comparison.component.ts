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
import {CriteriaComparison} from "../../../shared/model/criteria-comparison";
import {OptionComparison} from "../../../shared/model/option-comparison";

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

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private userService: UserService,
              private ahpService: AhpService,
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
    this.userService.checkScaleType().subscribe((scaleType: any) => {
      this.scaleType = scaleType;
    })
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
                weightList.push(new OptionComparison(optionA.id, optionB.id, radio.value));
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
            weightList.push(new OptionComparison(optionA.id, optionB.id, slider.value));
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
      this.router.navigate(['solve/ahp/results/' + this.problem.id]).then();
    });
  }
}
