import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionService} from "../option.service";
import {Option} from "../../shared/model/option";
import {CriterionOption} from "../../shared/model/criterion-option";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-add-option-criterion-modal',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './add-option-criterion-modal.component.html',
  styleUrl: './add-option-criterion-modal.component.css'
})
export class AddOptionCriterionModalComponent {
  optionId: number = 0;
  criterionId: number = 0;

  constructor(private activeModal: NgbActiveModal,
              private optionService: OptionService,
              private eventService: EventService) {
  }


  optionCriterionForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  addOptionCriterion() {
    let criterionOption : CriterionOption = new CriterionOption(this.optionId, this.criterionId, this.optionCriterionForm.get('value')?.getRawValue())
    this.optionService.addOptionCriterion(criterionOption).subscribe(
      (data) => {
        this.eventService.emit("alert-success", data);
        this.activeModal.close('Success');
      },
      (error) => {
        this.eventService.emit("alert-error", error);
        this.activeModal.close('Failure');
      }
    );
  }
}
