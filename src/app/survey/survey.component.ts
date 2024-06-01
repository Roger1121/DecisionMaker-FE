import {Component} from '@angular/core';
import {SurveyService} from "./survey.service";
import {EventService} from "../shared/services/EventService";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Question} from "../shared/model/question";
import {QuestionResponse} from "../shared/model/question-response";
import {QuestionService} from "../question/question.service";
import {Answer} from "../shared/model/answer";
import {OptionComparison} from "../shared/model/option-comparison";

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgIf
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  protected questions: Question[] = [];
  protected responses: QuestionResponse[] = [];
  answers: Answer[] = [];
  user_id: any;

  constructor(private questionService: QuestionService,
              private surveyService: SurveyService,
              private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.user_id = params.get('userId');
      this.surveyService.checkAvailable(this.user_id).subscribe((data) => {
        if (data) {
          this.loadQuestions(this.user_id);
        } else {
          this.eventService.emit("alert-info", "Ankieta ewaluacyjna jest dostępna dopiero po rozwiązaniu dwóch zadań.");
          this.router.navigate(['/problem/available']).then();
        }
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      })
    });
  }

  private loadQuestions(user_id: any) {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data;
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    });
    this.questionService.getAnswers().subscribe((data: any) => {
      this.answers = data;
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    });
    this.surveyService.getResponses(user_id).subscribe((data: any) => {
      this.responses = data;
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    });
  }

  checkResponseExists(question_id: number | undefined) {
    return this.responses.filter(resp => resp.question === question_id).length === 1;
  }

  getResponseContent(question_id: number | undefined) {
    let responses = this.responses.filter(resp => resp.question === question_id);
    if(responses.length === 0){
      return null;
    } else {
      return responses[0].content;
    }
  }

  getAnswersByQuestion(question_id: any) {
    return this.answers.filter(answer => answer.question === question_id);
  }

  getQuestionResponse(question: Question) {
    if (question.type === 'otwarte') {
      let textarea: any = document.getElementById("response" + question.id?.toString(10));
      if (textarea.value.trim().length === 0) {
        return null;
      } else {
        return textarea.value.trim();
      }
    } else if (question.type === 'likert') {
      for (let i = 1; i <= 5; i++) {
        let radio: any = document.getElementById("" + question.id?.toString(10) + i.toString(10));
        if (radio.checked) {
          return radio.value.trim();
        }
      }
    } else {
      for (let i = 0; i < this.getAnswersByQuestion(question.id).length; i++) {
        let radio: any = document.getElementById("" + question.id?.toString(10) + i.toString(10));
        if (radio.checked) {
          return radio.value.trim();
        }
      }
    }
    return null;
  }

  saveResponses() {
    let responses: QuestionResponse[] = [];
    this.questions.filter(q => this.getResponseContent(q.id) === null).forEach(question => {
      let content = this.getQuestionResponse(question);
      if (content !== null) {
        responses.push(new QuestionResponse(question.id, content));
      }
    });
    this.surveyService.saveResponses(responses).subscribe((data) => {
      this.surveyService.getResponses(this.user_id).subscribe((data: any) => {
        this.responses = data;
      }, (error) => {
        this.eventService.emit("alert-error", error.error);
      });
      this.eventService.emit("alert-success", data)
    }, (error) => {
      this.eventService.emit("alert-error", error.error);
    });
  }
}
