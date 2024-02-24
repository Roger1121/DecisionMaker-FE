import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
