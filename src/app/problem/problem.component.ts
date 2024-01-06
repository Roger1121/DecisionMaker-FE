import { Component } from '@angular/core';
import {Problem} from "../shared/model/problem";
import {EventService} from "../shared/services/EventService";
import {ProblemService} from "./problem.service";
import {AddProblemFormComponent} from "./add-problem-form/add-problem-form.component";
import {ProblemFilterComponent} from "./problem-filter/problem-filter.component";
import {ProblemListComponent} from "./problem-list/problem-list.component";

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [
    AddProblemFormComponent,
    ProblemFilterComponent,
    ProblemListComponent
  ],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css'
})
export class ProblemComponent {
  problems : Problem[] = [];

  filter : any;

  ngOnInit(){
    this.problemService.getProblems().subscribe((data: any) => {this.problems =data;}, (error) => alert(error.message));
  }

  constructor(events: EventService, private problemService: ProblemService) {
    events.listen("removeProblem", (problem: Problem) =>{
      this.problemService.deleteProblem(problem.id).subscribe((data)=>{
        this.problemService.getProblems().subscribe((data: any) => {this.problems =data;});
      });
    })
  }

  addProblem(problem: Problem){
    this.problemService.addProblem(problem).subscribe((data) => {
      this.problemService.getProblems().subscribe((data: any) => {this.problems =data;});
    });
  }
}
