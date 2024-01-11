import { Component } from '@angular/core';
import {ProblemService} from "../problem.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CriterionService} from "../../criterion/criterion.service";
import {Problem} from "../../shared/model/problem";
import {Criterion} from "../../shared/model/criterion";
import {CriterionListItemComponent} from "../../criterion/criterion-list-item/criterion-list-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-problem-details',
  standalone: true,
  imports: [
    CriterionListItemComponent,
    NgForOf
  ],
  templateUrl: './problem-details.component.html',
  styleUrl: './problem-details.component.css'
})
export class ProblemDetailsComponent {

  problem: any = {};
  criteria: Criterion[] = [];

  constructor(private problemService: ProblemService, private criteriaService: CriterionService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => this.criteria = criteria);
      });
    })
  }

  toggleAvailability(){
    alert("Availability changed")
  }

  removeProblem(){
    alert("Problem removed")
  }
}
