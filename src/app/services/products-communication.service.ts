import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsCommunicationService {

  private readonly currentLayout = new BehaviorSubject<Layout>('grid');
  private readonly currentFilter = new BehaviorSubject<{ active: boolean; value: string }>({ active: false, value: '' });
  private readonly layout$ = this.currentLayout.asObservable();
  private readonly filter$ = this.currentFilter.asObservable();

  constructor() { }

  public onNewLayout() {
    return this.layout$;
  }

  public newLayout(layout: Layout) {
    this.currentLayout.next(layout);
  }

  public onFilterProducts() {
    return this.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  }

  public filterProducts(filter: { active: boolean; value: string }) {
    this.currentFilter.next(filter);
  }
}

export type Layout = 'grid' | 'list';
