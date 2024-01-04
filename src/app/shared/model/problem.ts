export class Problem{
  constructor(
    public name: string,
    public description: string,
    public is_available: boolean,
    public group: number,
    public id?: number
  ){}
}

