import {Component, Input} from '@angular/core';
import {OptionService} from "../option.service";
import {CriterionService} from "../../criterion/criterion.service";
import {Criterion} from "../../shared/model/criterion";
import {Option} from "../../shared/model/option";
import {NgForOf, NgIf} from "@angular/common";
import {OptionsListItemComponent} from "../options-list-item/options-list-item.component";

@Component({
  selector: 'options-list',
  standalone: true,
  imports: [
    NgForOf,
    OptionsListItemComponent,
    NgIf
  ],
  templateUrl: './options-list.component.html',
  styleUrl: './options-list.component.css'
})
export class OptionsListComponent {
  @Input() problemId!: number;
  @Input() criteria!: Criterion[];

  options: Option[] = [];

  constructor(private optionService: OptionService){}

  ngOnInit(){
    this.optionService.getOptionsByProblemId(this.problemId).subscribe((data:any)=>{
      this.options = data;
    })
  }


}
