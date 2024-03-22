import { Component } from '@angular/core';
import {AhpService} from "../ahp.service";
import {ProblemService} from "../../../problem/problem.service";
import {CriterionService} from "../../../criterion/criterion.service";
import {OptionService} from "../../../option/option.service";
import {UserService} from "../../../user/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Criterion} from "../../../shared/model/criterion";
import {CriterionWeight} from "../../../shared/model/criterion-weight";
import {CriterionOption} from "../../../shared/model/criterion-option";
import {Option} from "../../../shared/model/option";
import {ComparisonItem} from "../../../shared/model/comparison-item";
import {AvailableDetailsComponent} from "../../../problem/user/available-details/available-details.component";
import {NgForOf} from "@angular/common";
import {OptionComparisonItem} from "../../../shared/model/option-comparison-item";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'app-ahp-result',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf
  ],
  templateUrl: './ahp-result.component.html',
  styleUrl: './ahp-result.component.css'
})
export class AhpResultComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  criteriaWeights: CriterionWeight[] = [];
  critOptions: CriterionOption[] = [];
  options: Option[] = [];
  scaleType: number = 0;
  criteriaMatrix: ComparisonItem[][] = [];
  optionMatrices: OptionComparisonItem[] = [];

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private optionService: OptionService,
              private ahpService:AhpService,
              private userService: UserService,
              private route: ActivatedRoute,
              private eventService: EventService) { }

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
            }, (error) => {
              this.eventService.emit("alert-error", error.error);
            })
          }
        }, (error) => {
          this.eventService.emit("alert-error", error.error);
        });
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.criteriaService.getCriteriaWeights(id).subscribe((data: any) => {
        this.criteriaWeights = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.optionService.getOptionsByProblemId(id).subscribe((data: any) => {
        this.options = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.ahpService.getCriteriaMatrix(id).subscribe((data: any) => {
        this.criteriaMatrix = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.ahpService.getOptionMatrices(id).subscribe((data: any) => {
        this.optionMatrices = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
    });
    this.userService.checkScaleType().subscribe((scaleType: any) => {
      this.scaleType = scaleType;
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    })
  }

  getComparisonValue(comparisonItem: ComparisonItem | undefined) {
    if(comparisonItem?.value !== 1 && comparisonItem?.reversed){
      return "1/"+comparisonItem.value;
    }
    return comparisonItem?.value;
  }

  getOptionMatrix(criterion: number|undefined){
    let options = this.optionMatrices.filter(matrix => typeof criterion === "number" && matrix.criterion === criterion)[0]
    return options?.matrix;
  }

  getCriterionOptionName(option_id: any, criterion_id: any) {
    let options = this.critOptions
      .filter(option => criterion_id == option.criterion && option_id == option.option)
    return options.length > 0 ? options[0].value : null;
  }
}
