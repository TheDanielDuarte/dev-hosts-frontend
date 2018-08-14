export class User {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public chargePerMonth?: number,
  ) {}
}
