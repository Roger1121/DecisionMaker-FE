import {Component, Input} from '@angular/core';
import {CriterionOption} from "../../shared/model/criterion-option";
import {Criterion} from "../../shared/model/criterion";
import {Option} from "../../shared/model/option";
import {OptionService} from "../option.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'options-list-item',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './options-list-item.component.html',
  styleUrl: './options-list-item.component.css'
})
export class OptionsListItemComponent {
  @Input() option!: Option;
  @Input() criteria!: Criterion[];

  optionCriteria: CriterionOption[] = [];

  constructor(private optionService: OptionService){}

  ngOnInit(){
    this.optionService.getOptionCriteria(this.option.id).subscribe((data: any)=>{
      this.optionCriteria = data;
    })
  }

  getOptionCriterionValue(criterion_id: any){
    return this.optionCriteria.find((option) => option.criterion = criterion_id)?.value
  }
}
