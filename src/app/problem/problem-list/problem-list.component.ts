import { Component, Input } from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {NgForOf, NgIf} from "@angular/common";
import {ProblemListItemComponent} from "../problem-list-item/problem-list-item.component";

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

  @Input()
  public problems: Problem[] = [];

  constructor() {
  }
}
