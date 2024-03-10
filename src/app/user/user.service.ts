import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../shared/model/user/login";
import {Registration} from "../shared/model/user/registration";
import {PasswordReset} from "../shared/model/user/password-reset";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(userData: Login){
    return this.http.post('http://localhost:8000/token', userData)
  }

  register(registrationData: Registration){
    return this.http.post('http://localhost:8000/register', registrationData)
  }

  checkScaleType() {
    return this.http.get('http://localhost:8000/user/scale')
  }

  checkUserGroup(){
    return this.http.get('http://localhost:8000/user/group')
  }

  checkUserPrivileges(){
    return this.http.get('http://localhost:8000/user/privileges')
  }

  requestRecovery(param: { email: string }) {
    return this.http.post('http://localhost:8000/password/recovery/request', param)
  }

  resetPassword(resetData: PasswordReset) {
    return this.http.post('http://localhost:8000/password/reset', resetData);
  }
}
