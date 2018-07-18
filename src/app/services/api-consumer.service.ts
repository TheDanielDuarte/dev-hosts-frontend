import { Injectable } from '@angular/core';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {
  private static readonly apiURL = 'https://devhosts.herokuapp.com/api';

  constructor() { }

  public servers() {}

  public services() {}

  public dataStorage() {}

  private getResource() {}
}
