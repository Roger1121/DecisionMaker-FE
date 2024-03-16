import {Component, Input} from '@angular/core';
import {CriterionOption} from "../../shared/model/criterion-option";
import {Criterion} from "../../shared/model/criterion";
import {Option} from "../../shared/model/option";
import {OptionService} from "../option.service";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {AddCriterionFormComponent} from "../../criterion/admin/add-criterion-form/add-criterion-form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddOptionCriterionModalComponent} from "../add-option-criterion-modal/add-option-criterion-modal.component";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'options-list-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './options-list-item.component.html',
  styleUrl: './options-list-item.component.css'
})
export class OptionsListItemComponent {
  @Input() option!: Option;
  @Input() criteria!: Criterion[];

  optionCriteria: CriterionOption[] = [];

  constructor(private optionService: OptionService,
              private modalService: NgbModal,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.optionService.getOptionCriteria(this.option.id).subscribe((data: any) => {
      this.optionCriteria = data;
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    })
  }

  getOptionCriterionValue(criterion_id: any) {
    return this.optionCriteria.find((option) => option.criterion === criterion_id)?.value
  }

  addCriterionOptionValue(criterionId: number) {
    const modalRef = this.modalService.open(AddOptionCriterionModalComponent);
    modalRef.componentInstance.optionId = this.option.id;
    modalRef.componentInstance.criterionId = criterionId;
    modalRef.result.then(
      (result) => {
        if (result === 'Success') {
          this.optionService.getOptionCriteria(this.option.id).subscribe((data: any) => {
            this.optionCriteria = data;
          }, (error) => {
            this.eventService.emit("alert-error", error.error);
          })
        }
      }
    )
  }
}
