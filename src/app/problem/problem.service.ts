import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Problem} from "../shared/model/problem";

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient) { }

  getProblems(){
    return this.http.get('http://localhost:8000/problem');
  }

  addProblem(problem: Problem){
    return this.http.post('http://localhost:8000/problem', problem)
  }

  deleteProblem(problem_id: any){
    return this.http.delete('http://localhost:8000/problem/' + problem_id)
  }
}
