import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProblemListItemComponent} from "../../admin/problem-list-item/problem-list-item.component";
import {Problem} from "../../../shared/model/problem";
import {ProblemService} from "../../problem.service";
import {AvailableListItemComponent} from "../available-list-item/available-list-item.component";
import {ProblemStage} from "../../../shared/model/problem-stage";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-available-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ProblemListItemComponent,
    AvailableListItemComponent
  ],
  templateUrl: './available-list.component.html',
  styleUrl: './available-list.component.css'
})
export class AvailableListComponent {
  problems : Problem[] = [];
  problemStages : ProblemStage[] = [];
  userGroup! : number;

  ngOnInit(){
    this.loadProblemList();
  }

  constructor(private problemService: ProblemService, private userService: UserService) {}
  loadProblemList(){
    this.problemService.getAvailableProblems().subscribe((data: any) => {this.problems =data;}, (error) => alert(error.message));
    this.problemService.getProblemStages().subscribe((data: any) => {this.problemStages =data;}, (error) => alert(error.message));
    this.userService.checkUserGroup().subscribe((data: any) => {this.userGroup =data;}, (error) => alert(error.message));
  }

  getStageByProblem(problem_id: number|undefined){
    let stages = this.problemStages.filter(stage => stage.problem === problem_id);
    if(stages.length === 0)
      return 0;
    return stages[0].stage;
  }
}
