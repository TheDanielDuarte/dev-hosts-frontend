export class Service {
  constructor(
    public id: number,
    public createdAt: Date,
    public updatedAt: Date,
    public name: string,
    public description: string,
    public pricePerMonth: number,
    public eventsPerMonth: number,
    public historyInDays: number,
    public users: number,
    public concurrentBuilds: string,
    public buildsPerDay: string,
    public group: Group
  ) {}
}

class Group {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public subgroupName: string,
    public subgroupDescription: string
  ) {}
}
