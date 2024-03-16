import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Registration} from "../../shared/model/user/registration";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService,
              private router: Router,
              private eventService: EventService) {
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    scaleType: new FormControl('0', [Validators.required])
  })

  register(){
    let credentials : Registration = new Registration(this.registerForm.get('email')?.getRawValue(),
      this.registerForm.get('password')?.getRawValue(),
      this.registerForm.get('passwordConfirm')?.getRawValue(),
      this.registerForm.get('scaleType')?.getRawValue() as number)
    this.userService.register(credentials).subscribe(
      (data) => {
        this.eventService.emit("alert-success", data);
        this.router.navigate(['']).then()
      },
      (error) => {
        this.eventService.emit("alert-error", error);
        alert(error);
      }
    )
  }
}
