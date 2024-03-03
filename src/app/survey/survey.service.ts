import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestionResponse} from "../shared/model/question-response";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  checkAvailable(){
    return this.http.get('http://localhost:8000/survey/available');
  }

  getResponses() {
    return this.http.get('http://localhost:8000/survey');
  }

  saveResponses(responses: QuestionResponse[]) {
    return this.http.post('http://localhost:8000/survey', responses);
  }
}
