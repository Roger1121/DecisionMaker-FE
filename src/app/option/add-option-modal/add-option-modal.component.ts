import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OptionService} from "../option.service";
import {Option} from "../../shared/model/option";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-add-option-modal',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-option-modal.component.html',
  styleUrl: './add-option-modal.component.css'
})
export class AddOptionModalComponent {

  problemId: number = 0;

  constructor(private activeModal: NgbActiveModal,
              private optionService: OptionService,
              private eventService: EventService) {
  }


  optionForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  addCriterion() {
    let option : Option = new Option(this.optionForm.get('name')?.getRawValue(), this.problemId)
    this.optionService.addOption(option).subscribe(
      (data) => {
        this.eventService.emit("alert-success", data);
        this.activeModal.close('Success');
      },
      (error) => {
        this.eventService.emit("alert-error", error.error);
        this.activeModal.close('Failure');
      }
    );
  }
}
