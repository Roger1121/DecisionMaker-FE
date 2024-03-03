import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../shared/model/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get('http://localhost:8000/question')
  }

  addQuestion(question: Question) {
    return this.http.post('http://localhost:8000/question', question)
  }

  deleteQuestion(question_id: any){
    return this.http.delete(`http://localhost:8000/question/${question_id}`)
  }
}
