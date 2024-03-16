import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Login} from "../../shared/model/user/login";
import {Router} from "@angular/router"
import {NgIf} from "@angular/common";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router, private eventService: EventService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  login() {
    let credentials: Login = new Login(this.loginForm.get('email')?.getRawValue(), this.loginForm.get('password')?.getRawValue())
    this.userService.login(credentials).subscribe(
      (data: any) => {
        window.sessionStorage.removeItem("USER_TOKEN");
        window.sessionStorage.setItem('USER_TOKEN', data['access']);
        this.eventService.emit("user-logged-in", data['access']);
        this.userService.checkUserPrivileges().subscribe((data) => {
          if (data === 'ADMIN') {
            this.router.navigate(['/problem']).then();
          } else {
            this.router.navigate(['/problem/available']).then();
          }
        }, (error) => {
          this.eventService.emit("alert-error", error);
        });
      },
      (error) => {
        this.eventService.emit("alert-error", "Nieprawidłowy login lub hasło");
      }
    )
  }
}
