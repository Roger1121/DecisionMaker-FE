import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../shared/model/user/login";
import {Registration} from "../shared/model/user/registration";
import {PasswordReset} from "../shared/model/user/password-reset";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(userData: Login){
    return this.http.post(environment.API_URL+'/token', userData)
  }

  register(registrationData: Registration){
    return this.http.post(environment.API_URL+'/register', registrationData)
  }

  checkScaleType() {
    return this.http.get(environment.API_URL+'/user/scale')
  }

  checkUserGroup(){
    return this.http.get(environment.API_URL+'/user/group')
  }

  checkUserPrivileges(){
    return this.http.get(environment.API_URL+'/user/privileges')
  }

  requestRecovery(param: { email: string }) {
    return this.http.post(environment.API_URL+'/password/recovery/request', param)
  }

  resetPassword(resetData: PasswordReset) {
    return this.http.post(environment.API_URL+'/password/reset', resetData);
  }
}
