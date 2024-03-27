import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/model/question";
import {EventService} from "../../shared/services/EventService";
import {BehaviorSubject, Observable} from "rxjs";
import {Answer} from "../../shared/model/answer";
import {Criterion} from "../../shared/model/criterion";

@Component({
  selector: 'app-add-question-modal',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.css'
})
export class AddQuestionModalComponent {

  private _isAnswersVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAnswersVisibleObs: Observable<boolean> = this._isAnswersVisible.asObservable();

  constructor(private activeModal: NgbActiveModal,
              private questionService: QuestionService,
              private eventService: EventService) {
  }

  questionForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    type: new FormControl('likert', [Validators.required]),
    answers: new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(200)])
      })
    ])
  });

  addAnswer() {
    const answerList = <FormArray>this.questionForm.controls['answers'];
    answerList.push(
      new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(200)])
      })
    );
  }

  questionTypeChanged(newType: string) {
    this._isAnswersVisible.next(newType === 'warianty');
  }

  addQuestion() {
    let question: Question = new Question(this.questionForm.get('content')?.getRawValue(), this.questionForm.get('type')?.getRawValue())
    this.questionService.addQuestion(question).subscribe(
      (data) => {
        if(question.type === 'warianty'){
          this.saveAnswers(data);
        } else {
          this.eventService.emit("alert-success", "Pytanie zostało dodane");
          this.activeModal.close('Success');
        }
      },
      (error) => {
        this.eventService.emit("alert-error", error.error);
        this.activeModal.close('Failure');
      }
    );
  }

  saveAnswers(question_id: any) {
    let answers: Answer[] = [];
    for (let answer of this.answers['controls']) {
      const ans = answer as FormGroup
      answers.push(new Answer(ans.get('name')?.getRawValue(), question_id));
    }
    this.questionService.saveAnswers(answers).subscribe(
      (data) => {
        this.eventService.emit("alert-success", "Pytanie zostało dodane");
        this.activeModal.close('Success');
      },
      (error) => {
        this.eventService.emit("alert-error", error.error);
        this.activeModal.close('Failure');
      });
  }

  removeAnswer(index: number) {
    const answerList = <FormArray>this.questionForm.controls['answers'];
    answerList.removeAt(index);
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
}
