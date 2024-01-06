import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ProblemListComponent} from "./problem/problem-list/problem-list.component";
import {AddProblemFormComponent} from "./problem/add-problem-form/add-problem-form.component";
import {ProblemFilterComponent} from "./problem/problem-filter/problem-filter.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {ProblemComponent} from "./problem/problem.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ProblemListComponent, AddProblemFormComponent, ProblemFilterComponent, HeaderComponent, FooterComponent, ProblemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = "mcda-fe";
}
