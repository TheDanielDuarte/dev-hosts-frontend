export class DataStorage {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public shortDescription: string,
    public storageInGb: number,
    public transferInTb: number,
    public pricePerMonth: number
  ) {}
}
