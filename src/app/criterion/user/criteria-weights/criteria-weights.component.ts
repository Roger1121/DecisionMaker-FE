import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProblemService} from "../../../problem/problem.service";
import {Criterion} from "../../../shared/model/criterion";
import {CriterionService} from "../../criterion.service";
import {AvailableDetailsComponent} from "../../../problem/user/available-details/available-details.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {UserService} from "../../../user/user.service";
import {CriterionWeight} from "../../../shared/model/criterion-weight";
import $ from "jquery";

@Component({
  selector: 'criteria-weights',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './criteria-weights.component.html',
  styleUrl: './criteria-weights.component.css'
})
export class CriteriaWeightsComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  isNumericScale: boolean = true;

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('problemId');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => this.criteria = criteria);
      });
    });
    this.userService.checkScaleType().subscribe((isNumeric: any) => {
      this.isNumericScale = isNumeric;
    })
  }

  numericScaleChoosen() {
    return this.isNumericScale;
  }

  getDescriptiveWeights(): CriterionWeight[] {
    let weightList: CriterionWeight[] = [];
    for (let criterion of this.criteria) {
      for (let i = 1; i <= 5; i++) {
        let radio: any = document.getElementById(criterion.id?.toString(10) + i.toString(10));
        if (radio.checked) {
          weightList.push(new CriterionWeight(criterion.id, radio.value));
        }
      }
    }
    return weightList;
  }

  getNumericWeights() {
    let weightList: CriterionWeight[] = [];
    for (let criterion of this.criteria) {
      let slider: any = document.getElementById(criterion.id?.toString(10)+"");
      console.log(slider.value);
      weightList.push(new CriterionWeight(criterion.id, slider.value));
    }
    return weightList;
  }

  saveCriteriaWeights() {
    let weightList: CriterionWeight[] = []
    if (this.isNumericScale) {
      weightList = this.getNumericWeights()
    } else {
      weightList = this.getDescriptiveWeights()
    }
    this.criteriaService.saveCriteriaWeights(weightList).subscribe((response) => {
      this.router.navigate(['']).then()
    }, (error) => {
      alert("Couldn't save weights")
    })
  }
}
