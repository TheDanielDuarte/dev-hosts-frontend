export class Server {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public memoryInGb: number,
    public cpu: number,
    public storageInGb: number,
    public transferInTb: number,
    public pricePerMonth: number
  ) {}
}
