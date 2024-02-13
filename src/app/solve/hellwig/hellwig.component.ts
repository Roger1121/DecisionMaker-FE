import {Component} from '@angular/core';
import {AvailableDetailsComponent} from "../../problem/user/available-details/available-details.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Criterion} from "../../shared/model/criterion";
import {ProblemService} from "../../problem/problem.service";
import {CriterionService} from "../../criterion/criterion.service";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CriterionOption} from "../../shared/model/criterion-option";
import {OptionWeight} from "../../shared/model/option-weight";
import {OptionService} from "../../option/option.service";

@Component({
  selector: 'app-hellwig',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './hellwig.component.html',
  styleUrl: './hellwig.component.css'
})
export class HellwigComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  critOptions: CriterionOption[] = [];
  scaleType: number = 0;

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private optionService: OptionService,
              private userService: UserService,
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

  getDescriptiveCriteria() {
    return this.criteria.filter(criterion => criterion.type === "opisowe")
  }

  getNumericCriteria() {
    return this.criteria.filter(criterion => criterion.type === "liczbowe")
  }

  private getWeightsForNumericCriteria() {
    let weightList: OptionWeight[] = [];
    for (let criterion of this.getNumericCriteria()){
      for( let option of this.getCriterionOptions(criterion.id)){
        weightList.push(new OptionWeight(option.id, option.value as unknown as number));
      }
    }
    return weightList;
  }

  getCriterionOptions(criterion_id: any) {
    return this.critOptions.filter(option => option.criterion === criterion_id)
  }

  getScaleType() {
    return this.scaleType === 0;
  }


  getDescriptiveWeights(): OptionWeight[] {
    let weightList: OptionWeight[] = [];
    for (let criterion of this.getDescriptiveCriteria()) {
      for (let option of this.getCriterionOptions(criterion.id)) {
        for (let i = 1; i <= 7; i++) {
          let radio: any = document.getElementById(option.id?.toString(10) + i.toString(10));
          if (radio.checked) {
            weightList.push(new OptionWeight(option.id, radio.value));
          }
        }
      }
    }
    return weightList;
  }

  getNumericWeights() {
    let weightList: OptionWeight[] = [];
    for (let criterion of this.getDescriptiveCriteria()) {
      for (let option of this.getCriterionOptions(criterion.id)) {
        let slider: any = document.getElementById(option.id?.toString(10) + "");
        weightList.push(new OptionWeight(option.id, slider.value));
      }
    }
    return weightList;
  }

  saveOptionWeights() {
    let weightList: OptionWeight[]
    if (this.scaleType === 0) {
      weightList = this.getNumericWeights();
    } else {
      weightList = this.getDescriptiveWeights();
    }
    weightList.push(...(this.getWeightsForNumericCriteria()));
    this.optionService.saveOptionWeights(weightList).subscribe((response: any) => {
      this.router.navigate(['/solve/hellwig/ideal/' + this.problem.id]).then();
    }, (error) => {
      alert("Nie można zapisać wag opcji: " + error.error.res);
    })
  }
}
