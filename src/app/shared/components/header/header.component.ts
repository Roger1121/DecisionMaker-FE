import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../user/user.service";
import {EventService} from "../../services/EventService";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('USER_TOKEN') !== null);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  private _isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminObs: Observable<boolean> = this._isAdminSubject.asObservable();
  constructor(private router: Router, private userService: UserService, events: EventService) {
    events.listen("user-logged-in", (data: String) =>{
      this._isAuthenticatedSubject.next(true);
      this.userService.checkUserPrivileges().subscribe((data)=>{
        this._isAdminSubject.next(data === 'ADMIN');
      });
    })
  }

  ngOnInit(){
    this.userService.checkUserPrivileges().subscribe((data)=>{
      this._isAdminSubject.next(data === 'ADMIN');
    });
  }

  logout() {
    sessionStorage.clear();
    this._isAdminSubject.next(false);
    this._isAuthenticatedSubject.next(false);
    this.router.navigate(['']).then()
  }
}
