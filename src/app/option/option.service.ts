import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService";
import {Option} from "../shared/model/option";
import {CriterionOption} from "../shared/model/criterion-option";
import {environment} from "../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  getOptionsByProblemId(problem_id: any) {
    return this.http.get(environment.API_URL+'/option', {params: new HttpParams().set('problem_id', problem_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  getOptionCriteria(option_id: any) {
    return this.http.get(environment.API_URL+'/crit-option', {params: new HttpParams().set('option_id', option_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  addOption(option: Option) {
    return this.http.post(environment.API_URL+'/option', option)
  }

  addOptionCriterion(optionCriteria: CriterionOption) {
    return this.http.post(environment.API_URL+'/crit-option', optionCriteria)
  }

  updateOption(option: Option) {
    return this.http.put(environment.API_URL+'/option', option)
  }

  deleteOption(option_id: any){
    return this.http.delete(environment.API_URL+`/option/${option_id}`)
  }
}
