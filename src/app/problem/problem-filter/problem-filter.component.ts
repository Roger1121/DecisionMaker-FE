import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Problem} from "../../shared/model/problem";

const filters = [
  (problem: Problem) => problem,
  (problem: Problem) => !problem.is_available,
  (problem: Problem) => problem.is_available
]

@Component({
  selector: 'problem-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './problem-filter.component.html',
  styleUrl: './problem-filter.component.css'
})
export class ProblemFilterComponent {
  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();

  listFilter: any = '0';

  ngOnInit() {
    this.updateFilter(0);
  }

  updateFilter(value: any){
    this.filter = filters[value];
    this.filterChange.emit(this.filter);
  }
}
