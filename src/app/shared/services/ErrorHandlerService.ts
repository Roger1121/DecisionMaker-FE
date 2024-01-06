import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService{
  handleWebError(error: HttpErrorResponse){
    switch(error.status){
      case 0: {
        console.error("Błąd aplikacji frontendowej.", error.error)
        break;
      }
      case 404: {
        console.error("Nie znaleziono adresu zapytania", error.error)
        break;
      }
      case 401: {
        console.error("Brak uprawnień do wykonania akcji", error.error)
        break;
      }
      case 500: {
        console.error("Wewnętrzny błąd serwera", error.error)
        break;
      }
      default: {
        console.error("Błąd", error.error)
        break;
      }
    }
    return throwError(() => new Error("Podczas przetwarzania akcji wystąpił błąd."))
  }
}
