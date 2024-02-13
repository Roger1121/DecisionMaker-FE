import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Problem} from "../shared/model/problem";
import {catchError} from "rxjs";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService"

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getProblems(){
    return this.http.get('http://localhost:8000/problem').pipe(catchError(this.errorHandler.handleWebError))
  }

  getProblemStages(){
    return this.http.get('http://localhost:8000/solutions/stage').pipe(catchError(this.errorHandler.handleWebError))
  }

  getAvailableProblems(){
    return this.http.get('http://localhost:8000/problem/available').pipe(catchError(this.errorHandler.handleWebError))
  }

  getProblem(problem_id: any){
    return this.http.get(`http://localhost:8000/problem/${problem_id}`)
  }

  addProblem(problem: Problem){
    return this.http.post('http://localhost:8000/problem', problem)
  }

  updateProblem(problem: Problem, problem_id: any){
    return this.http.put(`http://localhost:8000/problem/${problem_id}`, problem)
  }

  deleteProblem(problem_id: any){
    return this.http.delete(`http://localhost:8000/problem/${problem_id}`)
  }
}
