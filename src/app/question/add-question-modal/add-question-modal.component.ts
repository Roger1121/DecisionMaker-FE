import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/model/question";

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

  constructor(private activeModal: NgbActiveModal, private questionService: QuestionService) {
  }

  questionForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  addQuestion() {
    let question : Question = new Question(this.questionForm.get('content')?.getRawValue())
    this.questionService.addQuestion(question).subscribe(
      (data) => {
        this.activeModal.close('Success');
      },
      (error) => {
        this.activeModal.close('Failure');
      }
    );
  }
}
