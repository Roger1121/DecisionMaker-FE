import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ProblemListComponent} from "./problem/admin/problem-list/problem-list.component";
import {AddProblemFormComponent} from "./problem/admin/add-problem-form/add-problem-form.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {AlertComponent} from "./shared/components/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ProblemListComponent,
    AddProblemFormComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = "mcda-fe";
}
