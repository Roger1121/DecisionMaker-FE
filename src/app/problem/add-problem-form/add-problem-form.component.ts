import {Component, Output, EventEmitter} from '@angular/core';
import {Problem} from "../../shared/model/problem";
import {ReactiveFormsModule} from "@angular/forms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProblemService} from "../problem.service";

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

  constructor(private activeModal: NgbActiveModal, private problemService: ProblemService) {
  }

  problemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    group: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  submitForm() {
    let problem = new Problem(this.problemForm.get('name')?.getRawValue(), this.problemForm.get('description')?.getRawValue(), false, this.problemForm.get('group')?.getRawValue());
    this.problemService.addProblem(problem).subscribe((data) => {
      this.activeModal.close('Success');
    });
  }
}
