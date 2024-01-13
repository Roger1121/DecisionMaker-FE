import {Component, Output, EventEmitter} from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {FormArray, ReactiveFormsModule} from "@angular/forms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProblemService} from "../problem.service";
import {CriterionService} from "../../criterion/criterion.service";
import {Criterion} from "../../shared/model/criterion";

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

  constructor(private activeModal: NgbActiveModal, private problemService: ProblemService, private criterionService: CriterionService) {
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

  addCriterion() {
    const criteriaList = <FormArray>this.problemForm.controls['criteria'];
    criteriaList.push(
      new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        type: new FormControl('', [Validators.required, Validators.maxLength(200)])
      })
    )
  }

  removeCriterion(index: number) {
    const criteriaList = <FormArray>this.problemForm.controls['criteria'];
    criteriaList.removeAt(index);
  }

  submitForm() {
    let problem = new Problem(this.problemForm.get('name')?.getRawValue(), this.problemForm.get('description')?.getRawValue(), false, this.problemForm.get('group')?.getRawValue(), 0);
    this.problemService.addProblem(problem).subscribe(
      (data) => {
        const problem = data as Problem;
        let criteriaList: Criterion[] = []
        for (let criterion of this.criteria['controls']) {
          const crit = criterion as FormGroup
          criteriaList.push(new Criterion(crit.get('name')?.getRawValue(), problem.id!, crit.get('type')?.getRawValue()));
        }
        console.log(criteriaList)
        this.criterionService.addCriteria(criteriaList)
          .subscribe(
            (data) => {
              console.log(data);
              this.activeModal.close('Success');
            },
            (error) => {
              console.log(error);
              this.activeModal.close('Failure');
            })
      },
      (error) => {
        this.activeModal.close('Failure');
      });
  }

  get criteria() {
    return this.problemForm.get('criteria') as FormArray;
  }
}
