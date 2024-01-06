import { Component } from '@angular/core';
import {Problem} from "../shared/model/problem";
import {EventService} from "../shared/services/EventService";
import {ProblemService} from "./problem.service";
import {AddProblemFormComponent} from "./add-problem-form/add-problem-form.component";
import {ProblemListComponent} from "./problem-list/problem-list.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [
    AddProblemFormComponent,
    ProblemListComponent
  ],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css'
})
export class ProblemComponent {
  problems : Problem[] = [];

  filter : any;

  ngOnInit(){
    this.loadProblemList();
  }

  constructor(events: EventService, private problemService: ProblemService, private modalService: NgbModal) {
    events.listen("removeProblem", (problem: Problem) =>{
      this.problemService.deleteProblem(problem.id).subscribe((data)=>{
        this.loadProblemList();
      });
    })
  }

  addProblem(){
    this.modalService.open(AddProblemFormComponent).result.then(
      (result) => {
        if(result==='Success'){
          this.loadProblemList();
        }
      }
    );
  }

  loadProblemList(){
    this.problemService.getProblems().subscribe((data: any) => {this.problems =data;}, (error) => alert(error.message));
  }
}
