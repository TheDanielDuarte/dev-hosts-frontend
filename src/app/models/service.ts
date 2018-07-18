export class Service {
  constructor(
    public id: number,
    public created_at: Date,
    public updated_at: Date,
    public name: string,
    public memoryInGb: number,
    public cpu: number,
    public storageInGb: number,
    public transferInTb: number,
    public pricePerMonth: number
  ) {}
}
