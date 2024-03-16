import {Component, Input, signal, SimpleChanges} from '@angular/core';
import {OptionService} from "../option.service";
import {Criterion} from "../../shared/model/criterion";
import {Option} from "../../shared/model/option";
import {NgForOf, NgIf} from "@angular/common";
import {OptionsListItemComponent} from "../options-list-item/options-list-item.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddOptionModalComponent} from "../add-option-modal/add-option-modal.component";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'options-list',
  standalone: true,
  imports: [
    NgForOf,
    OptionsListItemComponent,
    NgIf
  ],
  templateUrl: './options-list.component.html',
  styleUrl: './options-list.component.css'
})
export class OptionsListComponent {
  @Input() problemId!: number;
  @Input() criteria!: Criterion[];

  options: Option[] = [];

  constructor(private optionService: OptionService,
              private modalService: NgbModal,
              private eventService: EventService) {
    this.eventService.listen('criterion-deleted', (criterionId) => this.loadOptions())
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadOptions();
  }

  loadOptions() {
    if (this.problemId) {
      this.optionService.getOptionsByProblemId(this.problemId).subscribe((data: any) => {
        this.options = data;
      }, (error)=>{
        this.eventService.emit("alert-error", error);
      })
    }
  }

  addOption() {
    const modalRef = this.modalService.open(AddOptionModalComponent);
    modalRef.componentInstance.problemId = this.problemId;
    modalRef.result.then(
      (result) => {
        if (result === 'Success') {
          this.optionService.getOptionsByProblemId(this.problemId).subscribe((options: any) => {
            this.options = options
          }, (error) => {
            this.eventService.emit("alert-error", error);
          });
        }
      }
    )
  };

}
