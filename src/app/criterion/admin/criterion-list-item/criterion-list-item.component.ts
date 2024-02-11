import {Component, Input} from '@angular/core';
import {Criterion} from "../../../shared/model/criterion";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'criterion-list-item',
  standalone: true,
  imports: [],
  templateUrl: './criterion-list-item.component.html',
  styleUrl: './criterion-list-item.component.css'
})
export class CriterionListItemComponent {
  @Input() criterion! : Criterion;

  constructor(private eventService: EventService) {
  }

  removeCriterion(criterionId: any){
    this.eventService.emit('delete-criterion', criterionId);
  }
}
