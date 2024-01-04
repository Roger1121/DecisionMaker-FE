import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Problem} from "../../shared/model/problem";

@Component({
  selector: 'add-problem-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-problem-form.component.html',
  styleUrl: './add-problem-form.component.css'
})
export class AddProblemFormComponent {
  @Output() addProblem = new EventEmitter<Problem>();

  newProblemName = '';
  newProblemDescription = '';
  newProblemGroup = 0;

  addNewProblem(){
    this.addProblem.emit(new Problem(this.newProblemName, this.newProblemDescription, false, this.newProblemGroup))
    this.newProblemName = ''
    this.newProblemGroup = 0
    this.newProblemDescription = ''
  }
}
