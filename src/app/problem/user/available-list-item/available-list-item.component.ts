import {Component, Input} from '@angular/core';
import {Problem} from "../../../shared/model/problem";
import {Router, RouterLink} from "@angular/router";
import {SlicePipe} from "@angular/common";

@Component({
  selector: 'available-list-item',
  standalone: true,
  imports: [
    RouterLink,
    SlicePipe
  ],
  templateUrl: './available-list-item.component.html',
  styleUrl: './available-list-item.component.css'
})
export class AvailableListItemComponent {
  @Input() problem! : Problem;

  constructor(protected router: Router) {
  }
}
