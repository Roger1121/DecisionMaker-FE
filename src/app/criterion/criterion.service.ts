import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService";
import {catchError} from "rxjs";
import {Problem} from "../shared/model/problem";
import {Criterion} from "../shared/model/criterion";

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getCriteria(){
    return this.http.get('http://localhost:8000/criterion').pipe(catchError(this.errorHandler.handleWebError))
  }

  getCriteriaByProblemId(problem_id: any){
    return this.http.get('http://localhost:8000/criterion', {params: new HttpParams().set('problem_id', problem_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  getCriterion(criterion_id: any){
    return this.http.get(`http://localhost:8000/criterion/${criterion_id}`)
  }

  addCriterion(criterion: Criterion){
    return this.http.post('http://localhost:8000/criterion', criterion)
  }

  addCriteria(criteriaList: Criterion[]){
    return this.http.post('http://localhost:8000/criterion', criteriaList)
  }

  updateCriterion(criterion: Criterion, criterion_id: any){
    return this.http.put(`http://localhost:8000/criterion/${criterion_id}`, criterion)
  }

  deleteCriterion(criterion_id: any){
    return this.http.delete(`http://localhost:8000/criterion/${criterion_id}`)
  }
}
