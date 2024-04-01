import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestionResponse} from "../shared/model/question-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  checkAvailable(){
    return this.http.get(environment.API_URL+'/survey/available');
  }

  getResponses() {
    return this.http.get(environment.API_URL+'/survey');
  }

  saveResponses(responses: QuestionResponse[]) {
    return this.http.post(environment.API_URL+'/survey', responses);
  }
}
