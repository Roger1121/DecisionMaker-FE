import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/model/question";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-add-question-modal',
  standalone: true,
    imports: [
        NgIf,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.css'
})
export class AddQuestionModalComponent {

  constructor(private activeModal: NgbActiveModal,
              private questionService: QuestionService,
              private eventService: EventService) {
  }

  questionForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  addQuestion() {
    let question : Question = new Question(this.questionForm.get('content')?.getRawValue())
    this.questionService.addQuestion(question).subscribe(
      (data) => {
        this.eventService.emit("alert-success", data);
        this.activeModal.close('Success');
      },
      (error) => {
        this.eventService.emit("alert-error", error);
        this.activeModal.close('Failure');
      }
    );
  }
}
