import {Component, Input} from '@angular/core';
import {Criterion} from "../../shared/model/criterion";

@Component({
  selector: 'criterion-list-item',
  standalone: true,
  imports: [],
  templateUrl: './criterion-list-item.component.html',
  styleUrl: './criterion-list-item.component.css'
})
export class CriterionListItemComponent {
  @Input() criterion! : Criterion;
}
