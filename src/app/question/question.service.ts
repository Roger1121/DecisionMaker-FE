import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../shared/model/question";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get(environment.API_URL+'/question')
  }

  addQuestion(question: Question) {
    return this.http.post(environment.API_URL+'/question', question)
  }

  deleteQuestion(question_id: any){
    return this.http.delete(environment.API_URL+`/question/${question_id}`)
  }

  getAnswers(){
    return this.http.get(environment.API_URL+'/answer');
  }

  saveAnswers(answers: any){
    return this.http.post(environment.API_URL+'/answer', answers);
  }
}
