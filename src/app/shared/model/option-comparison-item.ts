import {ComparisonItem} from "./comparison-item";

export class OptionComparisonItem{
  constructor(
    public criterion: number,
    public matrix: ComparisonItem[][]
  ) {
  }
}
