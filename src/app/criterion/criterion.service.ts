import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService";
import {catchError} from "rxjs";
import {Criterion} from "../shared/model/criterion";
import {CriterionWeight} from "../shared/model/criterion-weight";
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getCriteria(){
    return this.http.get(environment.API_URL+'/criterion').pipe(catchError(this.errorHandler.handleWebError))
  }

  getCriteriaByProblemId(problem_id: any){
    return this.http.get(environment.API_URL+'/criterion', {params: new HttpParams().set('problem_id', problem_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  getCriterion(criterion_id: any){
    return this.http.get(environment.API_URL+`/criterion/${criterion_id}`)
  }

  addCriterion(criterion: Criterion){
    return this.http.post(environment.API_URL+'/criterion', criterion)
  }

  addCriteria(criteriaList: Criterion[]){
    return this.http.post(environment.API_URL+'/criterion', criteriaList)
  }

  updateCriterion(criterion: Criterion, criterion_id: any){
    return this.http.put(environment.API_URL+`/criterion/${criterion_id}`, criterion)
  }

  deleteCriterion(criterion_id: any){
    return this.http.delete(environment.API_URL+`/criterion/${criterion_id}`)
  }

  saveCriteriaWeights(weightList: CriterionWeight[]) {
    return this.http.post(environment.API_URL+'/criterion/weights', weightList)
  }

  getCriterionOptions(criterion_id: any) {
    return this.http.get(environment.API_URL+'/crit-option', {params: new HttpParams().set('criterion_id', criterion_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  getCriteriaWeights(problem_id: any) {
    return this.http.get(environment.API_URL+`/criterion/weights`, {params: new HttpParams().set('problem_id', problem_id)})
  }
}
