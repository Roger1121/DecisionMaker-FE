import { Component } from '@angular/core';
import {ProblemService} from "../problem.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-problem-details',
  standalone: true,
  imports: [],
  templateUrl: './problem-details.component.html',
  styleUrl: './problem-details.component.css'
})
export class ProblemDetailsComponent {

  problem: any = {};

  constructor(private problemService: ProblemService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.problemService.getProblem(id).subscribe(problem => this.problem = problem);
    })
  }
}
