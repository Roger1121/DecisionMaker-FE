import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Problem} from "../shared/model/problem";
import {catchError} from "rxjs";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService"
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getProblems(){
    return this.http.get(environment.API_URL+'/problem').pipe(catchError(this.errorHandler.handleWebError))
  }

  getProblemStages(){
    return this.http.get(environment.API_URL+'/solutions/stage').pipe(catchError(this.errorHandler.handleWebError))
  }

  getAvailableProblems(){
    return this.http.get(environment.API_URL+'/problem/available').pipe(catchError(this.errorHandler.handleWebError))
  }

  getProblem(problem_id: any){
    return this.http.get(environment.API_URL+`/problem/${problem_id}`)
  }

  addProblem(problem: Problem){
    return this.http.post(environment.API_URL+'/problem', problem)
  }

  updateProblem(problem: Problem, problem_id: any){
    return this.http.put(environment.API_URL+`/problem/${problem_id}`, problem)
  }

  deleteProblem(problem_id: any){
    return this.http.delete(environment.API_URL+`/problem/${problem_id}`)
  }
}
