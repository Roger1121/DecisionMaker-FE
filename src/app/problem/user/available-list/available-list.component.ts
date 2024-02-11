import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProblemListItemComponent} from "../../admin/problem-list-item/problem-list-item.component";
import {Problem} from "../../../shared/model/problem";
import {ProblemService} from "../../problem.service";
import {AvailableListItemComponent} from "../available-list-item/available-list-item.component";

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

  ngOnInit(){
    this.loadProblemList();
  }

  constructor(private problemService: ProblemService) {}
  loadProblemList(){
    this.problemService.getAvailableProblems().subscribe((data: any) => {this.problems =data;}, (error) => alert(error.message));
  }
}
