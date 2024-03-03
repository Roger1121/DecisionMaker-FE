import {Component} from '@angular/core';
import {SurveyService} from "./survey.service";
import {EventService} from "../shared/services/EventService";
import {Router} from "@angular/router";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {Question} from "../shared/model/question";
import {QuestionResponse} from "../shared/model/question-response";
import {QuestionService} from "../question/question.service";

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  protected questions: Question[] = [];
  private responses: QuestionResponse[] = [];

  constructor(private questionService: QuestionService,
              private surveyService: SurveyService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.surveyService.checkAvailable().subscribe((data) => {
      if (data) {
        this.loadQuestions();
      } else {
        this.eventService.emit("alert-info", "Ankieta ewaluacyjna jest dostępna dopiero po rozwiązaniu dwóch zadań.");
        this.router.navigate(['/problem/available']).then();
      }
    })
  }

  private loadQuestions() {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data;
    });
    this.surveyService.getResponses().subscribe((data: any) => {
      this.responses = data;
    })
  }

  checkResponseExists(question_id: number | undefined) {
    return this.responses.filter(resp => resp.question === question_id).length === 1;
  }

  getResponseContent(question_id: number | undefined) {
    return this.responses.filter(resp => resp.question === question_id)[0].content;
  }
  saveResponses() {

  }
}
