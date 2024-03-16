import {Component} from '@angular/core';
import {AvailableDetailsComponent} from "../../../problem/user/available-details/available-details.component";
import {NgForOf} from "@angular/common";
import {Criterion} from "../../../shared/model/criterion";
import {CriterionOption} from "../../../shared/model/criterion-option";
import {ProblemService} from "../../../problem/problem.service";
import {CriterionService} from "../../../criterion/criterion.service";
import {OptionService} from "../../../option/option.service";
import {UserService} from "../../../user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CriterionWeight} from "../../../shared/model/criterion-weight";
import {OptionWeight} from "../../../shared/model/option-weight";
import {Option} from "../../../shared/model/option";
import {HellwigResult} from "../../../shared/model/hellwig-result";
import {HellwigService} from "../hellwig.service";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'app-hellwig-result',
  standalone: true,
  imports: [
    AvailableDetailsComponent,
    NgForOf
  ],
  templateUrl: './hellwig-result.component.html',
  styleUrl: './hellwig-result.component.css'
})
export class HellwigResultComponent {
  problem: any = {};
  criteria: Criterion[] = [];
  criteriaWeights: CriterionWeight[] = [];
  critOptions: CriterionOption[] = [];
  options: Option[] = [];
  optionWeights: OptionWeight[] = [];
  ideals: number[] = [];
  finalRanks: HellwigResult[] = [];
  scaleType: number = 0;
  math = Math;

  constructor(private problemService: ProblemService,
              private criteriaService: CriterionService,
              private optionService: OptionService,
              private hellwigService: HellwigService,
              private userService: UserService,
              private route: ActivatedRoute,
              private eventService: EventService) {
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
      this.hellwigService.getOptionWeights(id).subscribe((data: any) => {
        this.optionWeights = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.hellwigService.getIdealSolutions(id).subscribe((data: any) => {
        this.ideals = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.hellwigService.getResults(id).subscribe((data: any) => {
        this.finalRanks = data;
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

  getCriterionWeight(criterion_id: number | undefined) {
    return this.criteriaWeights.filter(criterion => criterion_id === criterion.criterion)[0].weight
  }

  getOptionWeight(option_id: any, criterion_id: any) {
    let options = this.critOptions
      .filter(option => criterion_id == option.criterion && option_id == option.option)
    if (options.length === 0) {
      return null;
    }
    let weights = this.optionWeights.filter(option => option.criterionOption === options[0].id);
    return weights.length > 0 ? weights[0].weight : null;
  }

  getCriterionOptionName(option_id: any, criterion_id: any) {
    let options = this.critOptions
      .filter(option => criterion_id == option.criterion && option_id == option.option)
    return options.length > 0 ? options[0].value : null;
  }

  getIdealForCriterion(criterion_id: any) {
    let ideal = this.critOptions.filter(option => {
      return option.id != null && option.criterion === criterion_id && this.ideals.includes(option.id)
    });
    return ideal.length > 0 ? ideal[0] : null;
  }

  getOptionName(option_id: number) {
    let options = this.options.filter(option => option.id === option_id)
    return options.length === 0 ? null : options[0].name;
  }
}
