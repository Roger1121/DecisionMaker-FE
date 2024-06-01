import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CriteriaComparison} from "../../shared/model/criteria-comparison";
import {OptionComparison} from "../../shared/model/option-comparison";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AhpService {

  constructor(private http: HttpClient) { }

  saveCriteriaComparisons(comparisons: CriteriaComparison[]){
    return this.http.post(environment.API_URL+'/criterion/comparison', comparisons)
  }

  saveOptionComparisons(comparisons: OptionComparison[]){
    return this.http.post(environment.API_URL+'/crit-option/comparison', comparisons)
  }

  getCriteriaMatrix(problem_id: any, user_id: any){
    return this.http.get(environment.API_URL+'/criterion/matrix', {params: new HttpParams().set('problem_id', problem_id).set('user_id', user_id)})
  }

  getOptionMatrices(problem_id: any, user_id: any) {
    return this.http.get(environment.API_URL+'/crit-option/martices', {params: new HttpParams().set('problem_id', problem_id).set('user_id', user_id)})
  }
  getResults(problem_id: any, user_id: any){
    return this.http.get(environment.API_URL+'/solutions/ahp', {params: new HttpParams().set('problem_id', problem_id).set('user_id', user_id)})
  }
}
