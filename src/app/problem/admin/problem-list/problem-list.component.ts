import { Component } from '@angular/core';
import {Problem} from "../../../shared/model/problem";
import {NgForOf, NgIf} from "@angular/common";
import {ProblemListItemComponent} from "../problem-list-item/problem-list-item.component";
import {EventService} from "../../../shared/services/EventService";
import {ProblemService} from "../../problem.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddProblemFormComponent} from "../add-problem-form/add-problem-form.component";

@Component({
  selector: 'problem-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ProblemListItemComponent
  ],
  templateUrl: './problem-list.component.html',
  styleUrl: './problem-list.component.css'
})
export class ProblemListComponent {
  problems : Problem[] = [];

  ngOnInit(){
    this.loadProblemList();
  }

  constructor(private problemService: ProblemService,
              private modalService: NgbModal,
              private eventService: EventService) {
    eventService.listen("removeProblem", (problem: Problem) =>{
      this.problemService.deleteProblem(problem.id).subscribe((data)=>{
        this.eventService.emit("alert-success", data);
        this.loadProblemList();
      }, (error) => {
        this.eventService.emit("alert-error", error);
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
    this.problemService.getProblems().subscribe((data: any) => {this.problems =data;}, (error) => this.eventService.emit("alert-error", error));
  }
}
