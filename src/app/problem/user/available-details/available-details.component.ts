import {Component, Input} from '@angular/core';
import {Problem} from "../../../shared/model/problem";

@Component({
  selector: 'available-details',
  standalone: true,
  imports: [],
  templateUrl: './available-details.component.html',
  styleUrl: './available-details.component.css'
})
export class AvailableDetailsComponent {
  @Input()
  problem!: Problem;
}
