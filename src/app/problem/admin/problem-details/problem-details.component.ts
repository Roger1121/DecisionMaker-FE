import {Component, signal} from '@angular/core';
import {ProblemService} from "../../problem.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CriterionService} from "../../../criterion/criterion.service";
import {Criterion} from "../../../shared/model/criterion";
import {CriterionListItemComponent} from "../../../criterion/admin/criterion-list-item/criterion-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {OptionsListComponent} from "../../../option/options-list/options-list.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddCriterionFormComponent} from "../../../criterion/admin/add-criterion-form/add-criterion-form.component";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'app-problem-details',
  standalone: true,
  imports: [
    CriterionListItemComponent,
    NgForOf,
    OptionsListComponent,
    NgIf
  ],
  templateUrl: './problem-details.component.html',
  styleUrl: './problem-details.component.css'
})
export class ProblemDetailsComponent {

  problem: any = {};
  criteria: Criterion[] = [];

  constructor(private problemService: ProblemService, private criteriaService: CriterionService, private route: ActivatedRoute, private modalService: NgbModal, private eventService: EventService) {
    this.eventService.listen("delete-criterion", (criterionId) => {this.removeCriterion(criterionId)});
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.problemService.getProblem(id).subscribe((problem) => {
        this.problem = problem;
        this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => this.criteria = criteria);
      });
    })
  }

  toggleAvailability(){
    this.problem.is_available = !this.problem.is_available;
    this.problemService.updateProblem(this.problem, this.problem.id). subscribe((data: any)=>{
      if(data.is_available){
        alert("Zadanie jest teraz otwarte. Oczekiwanie na rozwiązania.")
      } else {
        alert("Zadanie zostało zamknięte. Brak możliwości zgłaszania rozwiązań.")
      }
    })
  }

  addCriterion() {
    const modalRef = this.modalService.open(AddCriterionFormComponent);
    modalRef.componentInstance.problemId = this.problem.id;
    modalRef.result.then(
      (result)=>{
        if(result==='Success'){
          this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => this.criteria = criteria);
        }
      }
    )
  }

  removeCriterion(criterionId: number){
    this.criteriaService.deleteCriterion(criterionId).subscribe((data) => {
      this.criteriaService.getCriteriaByProblemId(this.problem.id).subscribe((criteria: any) => this.criteria = criteria);
      this.eventService.emit('criterion-deleted', criterionId);
    })
  }
}
