import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private readonly actived = new BehaviorSubject({ show: false, color: 'accent' as ('primary' | 'accent') });

  constructor() { }

  public onActivation() {
    return this.actived.asObservable();
  }

  public changeState(newValue: boolean, color = 'accent' as ('primary' | 'accent') ) {
    this.actived.next({ show: newValue, color });
  }
}
