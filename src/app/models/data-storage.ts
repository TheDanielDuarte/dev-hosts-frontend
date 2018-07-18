export class DataStorage {
  constructor(
    public id: number,
    public created_at: Date,
    public updated_at: Date,
    public name: string,
    public shortDescription: string,
    public storageInGb: number,
    public transferInTb: number,
    public pricePerMonth: number
  ) {}
}
