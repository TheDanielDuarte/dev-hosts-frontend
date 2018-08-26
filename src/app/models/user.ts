import { Server } from '@models/server';
import { Service } from '@models/service';
import { DataStorage } from '@models/data-storage';

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
    public servers: Server[] = [],
    public services: Service[] = [],
    public dataStorage: DataStorage[] = [],
  ) {}
}
