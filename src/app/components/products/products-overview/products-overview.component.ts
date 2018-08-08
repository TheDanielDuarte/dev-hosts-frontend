import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {
  public titles = ['DevHosts\' list of products', 'Our list of servers', 'Our list of services', 'Our list of storage centers'];

  constructor() { }

  ngOnInit() {
  }

}
