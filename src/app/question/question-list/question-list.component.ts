import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {OptionsListItemComponent} from "../../option/options-list-item/options-list-item.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Question} from "../../shared/model/question";
import {QuestionService} from "../question.service";
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-question-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        OptionsListItemComponent
    ],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent {
  questions: Question[] = [];

  constructor(private questionService: QuestionService,
              private modalService: NgbModal,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
      this.questionService.getQuestions().subscribe((data: any) => {
        this.questions = data;
      }, (error) => {
        this.eventService.emit("alert-error", error);
      })
  }

  addQuestion() {
    const modalRef = this.modalService.open(AddQuestionModalComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'Success') {
          this.loadQuestions();
        }
      }
    )
  };

  deleteQuestion(question_id: any) {
    this.questionService.deleteQuestion(question_id).subscribe((data)=>{
      this.eventService.emit("alert-success", data);
      this.loadQuestions();
    }, (error) => {
      this.eventService.emit("alert-error", error);
    });
  }
}
