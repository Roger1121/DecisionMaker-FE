import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {EventService} from "../../../shared/services/EventService";

@Component({
  selector: 'app-password-recovery-request',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './password-recovery-request.component.html',
  styleUrl: './password-recovery-request.component.css'
})
export class PasswordRecoveryRequestComponent {
  constructor(private userService: UserService, private router: Router, private eventService: EventService) {
  }

  recoveryRequestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  requestRecovery(){
    let email : string = this.recoveryRequestForm.get('email')?.getRawValue();
    this.userService.requestRecovery({email:email}).subscribe(
      (data: any) => {
        this.eventService.emit("alert-success", data);
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.eventService.emit("alert-error", error.error);
      }
    )
  }
}
