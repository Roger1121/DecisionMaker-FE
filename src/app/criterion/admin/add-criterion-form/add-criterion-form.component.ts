import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CriterionService} from "../../criterion.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Criterion} from "../../../shared/model/criterion";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-criterion-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-criterion-form.component.html',
  styleUrl: './add-criterion-form.component.css'
})
export class AddCriterionFormComponent {

  problemId: number = 0;

  constructor(private activeModal: NgbActiveModal, private criterionService: CriterionService){ }


  criterionFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    type: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  addCriterion() {
    let criterion = new Criterion(this.criterionFrom.get('name')?.getRawValue(), this.problemId, this.criterionFrom.get('type')?.getRawValue())
    this.criterionService.addCriterion(criterion).subscribe(
      (data) => {
        console.log(data);
        this.activeModal.close('Success');
      },
      (error) => {
        console.log(error);
        this.activeModal.close('Failure');
      }
    );
  }

}
