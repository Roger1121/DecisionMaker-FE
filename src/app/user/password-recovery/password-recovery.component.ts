import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PasswordReset} from "../../shared/model/user/password-reset";
import {EventService} from "../../shared/services/EventService";

@Component({
  selector: 'app-password-recovery',
  standalone: true,
    imports: [
        NgIf,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  resetToken: string | null = "";
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.resetToken = params.get('token');
    });
  }

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  resetPassword(){
    let resetData : PasswordReset = new PasswordReset(
      this.resetToken,
      this.resetForm.get('email')?.getRawValue(),
      this.resetForm.get('password')?.getRawValue(),
      this.resetForm.get('passwordConfirm')?.getRawValue());
    this.userService.resetPassword(resetData).subscribe(
      (data: any) => {
        this.eventService.emit("alert-success", data);
        this.router.navigate(['']).then();
      },
      (error) => {
        this.eventService.emit("alert-error", error.error);
      }
    )
  }
}
