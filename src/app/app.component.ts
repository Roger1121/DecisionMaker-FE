import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {Problem} from "./shared/model/problem";
import {FormsModule} from "@angular/forms";
import {ProblemListComponent} from "./problem/problem-list/problem-list.component";
import {AddProblemFormComponent} from "./problem/add-problem-form/add-problem-form.component";
import {ProblemFilterComponent} from "./problem/problem-filter/problem-filter.component";
import {EventService} from "./shared/services/EventService";
import {ProblemService} from "./problem/problem.service";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ProblemListComponent, AddProblemFormComponent, ProblemFilterComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = "mcda-fe";

  problems : Problem[] = [];

  filter : any;

  ngOnInit(){
    this.problemService.getProblems().subscribe((data: any) => {this.problems =data;});
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
