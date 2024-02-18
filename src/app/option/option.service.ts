import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService";
import {Option} from "../shared/model/option";
import {CriterionOption} from "../shared/model/criterion-option";
import {OptionWeight} from "../shared/model/option-weight";
import {IdealSolution} from "../shared/model/ideal-solution";

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  getOptionsByProblemId(problem_id: any) {
    return this.http.get('http://localhost:8000/option', {params: new HttpParams().set('problem_id', problem_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  getOptionCriteria(option_id: any) {
    return this.http.get('http://localhost:8000/crit-option', {params: new HttpParams().set('option_id', option_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  addOption(option: Option) {
    return this.http.post('http://localhost:8000/option', option)
  }

  addOptionCriterion(optionCriteria: CriterionOption) {
    return this.http.post('http://localhost:8000/crit-option', optionCriteria)
  }

  updateOption(option: Option) {
    return this.http.put('http://localhost:8000/option', option)
  }

  deleteOption(option_id: any){
    return this.http.delete(`http://localhost:8000/option/${option_id}`)
  }
}
