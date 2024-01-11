import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs";
import {ErrorHandlerService} from "../shared/services/ErrorHandlerService";
import {Option} from "../shared/model/option";
import {CriterionOption} from "../shared/model/criterion-option";

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
    return this.http.get('http://localhost:8000/option/criteria', {params: new HttpParams().set('option_id', option_id)}).pipe(catchError(this.errorHandler.handleWebError))
  }

  addOptions(options: Option[]) {
    return this.http.post('http://localhost:8000/option', options)
  }

  addOptionCriteria(optionCriteria: CriterionOption[]) {
    return this.http.post('http://localhost:8000/option/criteria', optionCriteria)
  }

  updateOption(option: Option) {
    return this.http.put('http://localhost:8000/option', option)
  }

  updateOptionCriterion(optionCriterion: CriterionOption) {
    return this.http.put('http://localhost:8000/option/criteria', optionCriterion)
  }

  deleteOption(option_id: any){
    return this.http.delete(`http://localhost:8000/option/${option_id}`)
  }
}
