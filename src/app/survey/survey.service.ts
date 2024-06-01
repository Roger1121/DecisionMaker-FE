import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {QuestionResponse} from "../shared/model/question-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  checkAvailable(user_id: any){
    return this.http.get(environment.API_URL+'/survey/available', {params: new HttpParams().set('user_id', user_id)});
  }

  getResponses(user_id: any) {
    return this.http.get(environment.API_URL+'/survey', {params: new HttpParams().set('user_id', user_id)});
  }

  saveResponses(responses: QuestionResponse[]) {
    return this.http.post(environment.API_URL+'/survey', responses);
  }
}
