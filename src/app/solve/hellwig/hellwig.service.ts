import { Injectable } from '@angular/core';
import {OptionWeight} from "../../shared/model/option-weight";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IdealSolution} from "../../shared/model/ideal-solution";

@Injectable({
  providedIn: 'root'
})
export class HellwigService {

  constructor(private http: HttpClient) { }

  saveOptionWeights(weightList: OptionWeight[]) {
    return this.http.post('http://localhost:8000/crit-option/weights', weightList)
  }

  getIdealSolutions(problem_id: any) {
    return this.http.get('http://localhost:8000/solutions', {params: new HttpParams().set('problem_id', problem_id)})
  }

  saveIdealSolutions(solutions: IdealSolution[]) {
    return this.http.post('http://localhost:8000/solutions', solutions)
  }

  getOptionWeights(problem_id: any) {
    return this.http.get(`http://localhost:8000/crit-option/weights`, {params: new HttpParams().set('problem_id', problem_id)})
  }
  getResults(problem_id: any){
    return this.http.get(`http://localhost:8000/solutions/hellwig`, {params: new HttpParams().set('problem_id', problem_id)})
  }
}
