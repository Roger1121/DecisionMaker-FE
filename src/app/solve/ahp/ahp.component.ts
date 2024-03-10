import {Component} from '@angular/core';
import {AvailableDetailsComponent} from "../../problem/user/available-details/available-details.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Criterion} from "../../shared/model/criterion";
import {CriterionOption} from "../../shared/model/criterion-option";
import {ProblemService} from "../../problem/problem.service";
import {CriterionService} from "../../criterion/criterion.service";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AhpService} from "./ahp.service";
import {CriteriaComparison} from "../../shared/model/criteria-comparison";
import {CriterionWeight} from "../../shared/model/criterion-weight";
import {OptionComparison} from "../../shared/model/option-comparison";

@Component({
  selector: 'app-ahp',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf,
    NgTemplateOutlet,
    NgIf
  ],
  templateUrl: './ahp.component.html',
  styleUrl: './ahp.component.css'
})
export class AhpComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  scaleType: number = 0;
  reverseArray: boolean[][] = [];

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
          for (let i = 0; i < this.criteria.length; i++) {
            this.reverseArray.push([]);
            for (let j = 0; j < this.criteria.length; j++) {
              this.reverseArray[i].push(false);
            }
          }
        });
      });
    });
    this.userService.checkScaleType().subscribe((scaleType: any) => {
      this.scaleType = scaleType;
    })
  }

  getScaleType() {
    return this.scaleType === 0;
  }

  getDescriptiveValues(): CriteriaComparison[] {
    let weightList: CriteriaComparison[] = [];
    for (let criterionA of this.criteria) {
      for (let criterionB of this.criteria) {
        if (this.criteria.indexOf(criterionB) > this.criteria.indexOf(criterionA)) {
          for (let i = 1; i <= 9; i++) {
            let radio: any = document.getElementById("" + criterionA.id?.toString(10) + criterionB.id?.toString(10) + i.toString(10));
            if (radio.checked) {
              if (this.reverseArray[this.criteria.indexOf(criterionA)][this.criteria.indexOf(criterionB)]) {
                weightList.push(new CriteriaComparison(criterionB.id, criterionA.id, radio.value));
              } else {
                weightList.push(new CriteriaComparison(criterionA.id, criterionB.id, radio.value));
              }
            }
          }
        }
      }
    }
    return weightList;
  }

  getNumericValues(): CriteriaComparison[] {
    let weightList: CriteriaComparison[] = [];
    for (let criterionA of this.criteria) {
      for (let criterionB of this.criteria) {
        if (this.criteria.indexOf(criterionB) > this.criteria.indexOf(criterionA)) {
          let slider: any = document.getElementById("" + criterionA.id?.toString(10) + criterionB.id?.toString(10));
          if (this.reverseArray[this.criteria.indexOf(criterionA)][this.criteria.indexOf(criterionB)]) {
            weightList.push(new CriteriaComparison(criterionB.id, criterionA.id, slider.value));
          } else {
            weightList.push(new CriteriaComparison(criterionA.id, criterionB.id, slider.value));
          }
        }
      }
    }
    return weightList;
  }

  saveCriteriaComparison() {
    let comparisons: CriteriaComparison[];
    if (this.scaleType === 0) {
      comparisons = this.getNumericValues()
    } else {
      comparisons = this.getDescriptiveValues()
    }
    this.ahpService.saveCriteriaComparisons(comparisons).subscribe((data) => {
      this.router.navigate(['option/comparison/' + this.problem.id]).then();
    });
  }

  reverseItem(i: number, j: number) {
    this.reverseArray[i][j] = !this.reverseArray[i][j];
  }
}
