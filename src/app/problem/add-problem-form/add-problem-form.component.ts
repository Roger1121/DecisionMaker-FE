import { Component, Output, EventEmitter } from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {ReactiveFormsModule} from "@angular/forms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'add-problem-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-problem-form.component.html',
  styleUrl: './add-problem-form.component.css'
})
export class AddProblemFormComponent {
  @Output() addProblem = new EventEmitter<Problem>();

  problemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    group: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });



  submitForm(){
    if(!this.problemForm.valid){
      alert(" form invalid")
    }
  }

  addNewProblem(){
    // this.addProblem.emit(new Problem(this.newProblemName, this.newProblemDescription, false, this.newProblemGroup))
  }
}
