import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CriteriaComparison} from "../../shared/model/criteria-comparison";
import {OptionComparison} from "../../shared/model/option-comparison";

@Injectable({
  providedIn: 'root'
})
export class AhpService {

  constructor(private http: HttpClient) { }

  saveCriteriaComparisons(comparisons: CriteriaComparison[]){
    return this.http.post('http://localhost:8000/criterion/comparison', comparisons)
  }

  saveOptionComparisons(comparisons: OptionComparison[]){
    return this.http.post('http://localhost:8000/crit-option/comparison', comparisons)
  }

  getCriteriaMatrix(problem_id: any){
    return this.http.get('http://localhost:8000/criterion/matrix', {params: new HttpParams().set('problem_id', problem_id)})
  }

  getOptionMatrices(problem_id: any) {
    return this.http.get('http://localhost:8000/crit-option/martices', {params: new HttpParams().set('problem_id', problem_id)})
  }
}
