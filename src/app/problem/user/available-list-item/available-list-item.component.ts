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
  @Input() problemStage! :number;
  @Input() userGroup! :number;

  constructor(protected router: Router) {
  }

  getButtonContent(){
    switch (this.problemStage) {
      case 0:
        return "Otwórz";
      case 3:
        return "Zobacz wyniki";
      default:
        return "Kontynuuj rozwiązywanie";
    }
  }

  redirectToProblem(problem_id : number|undefined){
    let url = ""
    if((this.userGroup + this.problem.group) % 2 === 1){
      // Route to Hellwig
      switch (this.problemStage) {
        case 0:
          url = "/criteria/weights/"
          break;
        case 1:
          url = "/solve/hellwig/"
          break;
        case 2:
          url = "/solve/hellwig/ideal/"
          break;
        case 3:
          url = "/solve/hellwig/results/"
          break;
      }
    } else {
      //Route to AHP
      switch (this.problemStage){
        case 0:
          url = "/criteria/comparison/"
          break;
        case 2:
          url = "/option/comparison/"
          break;
        case 3:
          url = "/solve/ahp/results/"
          break;
      }
    }
    this.router.navigate([url, this.problem.id]).then();
  }
}
