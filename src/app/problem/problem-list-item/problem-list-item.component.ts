import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {EventService} from "./../../shared/services/EventService";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'problem-list-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './problem-list-item.component.html',
  styleUrl: './problem-list-item.component.css'
})
export class ProblemListItemComponent {
  @Input() problem! : Problem;

  constructor(private events: EventService) {
  }


  toggleAvailability(){
    this.problem.is_available = !this.problem.is_available;
  }

  removeProblem(){
    this.events.emit("removeProblem", this.problem)
  }
}
