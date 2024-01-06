import {Component, Output, EventEmitter} from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {FormArray, ReactiveFormsModule} from "@angular/forms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProblemService} from "../problem.service";

@Component({
  selector: 'add-problem-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-problem-form.component.html',
  styleUrl: './add-problem-form.component.css'
})
export class AddProblemFormComponent {

  constructor(private activeModal: NgbActiveModal, private problemService: ProblemService) {
  }

  problemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    group: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    criteria: new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        type: new FormControl('', [Validators.required, Validators.maxLength(200)])
      })
    ])
  });

  addCriterion(){
    const criteriaList = <FormArray>this.problemForm.controls['criteria'];
    criteriaList.push(
      new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        type: new FormControl('', [Validators.required, Validators.maxLength(200)])
      })
    )
  }

  removeCriterion(index: number){
    const criteriaList = <FormArray>this.problemForm.controls['criteria'];
    criteriaList.removeAt(index);
  }

  submitForm() {
    let problem = new Problem(this.problemForm.get('name')?.getRawValue(), this.problemForm.get('description')?.getRawValue(), false, this.problemForm.get('group')?.getRawValue());
    this.problemService.addProblem(problem).subscribe(
      (data) => {
        console.log(data);
        this.activeModal.close('Success');
      },
      (error) => {
        this.activeModal.close('Failure');
      });
  }

  get criteria(){
    return this.problemForm.get('criteria') as FormArray;
  }
}
