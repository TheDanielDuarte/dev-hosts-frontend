import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductsCommunicationService, Layout } from '@services/products-communication.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('searchInput', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 0.7 }),
        animate('200ms ease-in', style({transform: 'translateX(100%)', opacity: 0, borderBottom: 'none'}))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  public isGrid = true;
  public showSearchInput = false;
  public lastValue = '';
  @ViewChild('searchInput') private searchInput: ElementRef;

  constructor(
    private pagesCommunication: ProductsCommunicationService
  ) { }

  ngOnInit() {
    this.pagesCommunication.newLayout('grid');
  }

  public changeLayout(layout: Layout) {
    this.isGrid = layout === 'grid';
    this.pagesCommunication.newLayout(layout);
  }

  public filterProducts(event: Event) {
    const target = <HTMLInputElement>event.target;
    this.pagesCommunication.filterProducts({ active: true, value: target.value });
  }

  public toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
    if (this.searchInput) {
      const element = <HTMLInputElement>this.searchInput.nativeElement;
      this.lastValue = element.value;
    }
    this.pagesCommunication.filterProducts({ active: !this.searchInput, value: this.lastValue });
  }
}
