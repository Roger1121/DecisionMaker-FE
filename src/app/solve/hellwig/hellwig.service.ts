import { Injectable } from '@angular/core';
import {OptionWeight} from "../../shared/model/option-weight";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IdealSolution} from "../../shared/model/ideal-solution";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HellwigService {

  constructor(private http: HttpClient) { }

  saveOptionWeights(weightList: OptionWeight[]) {
    return this.http.post(environment.API_URL+'/crit-option/weights', weightList)
  }

  getIdealSolutions(problem_id: any) {
    return this.http.get(environment.API_URL+'/solutions', {params: new HttpParams().set('problem_id', problem_id)})
  }

  saveIdealSolutions(solutions: IdealSolution[]) {
    return this.http.post(environment.API_URL+'/solutions', solutions)
  }

  getOptionWeights(problem_id: any) {
    return this.http.get(environment.API_URL+`/crit-option/weights`, {params: new HttpParams().set('problem_id', problem_id)})
  }
  getResults(problem_id: any){
    return this.http.get(environment.API_URL+`/solutions/hellwig`, {params: new HttpParams().set('problem_id', problem_id)})
  }
}
