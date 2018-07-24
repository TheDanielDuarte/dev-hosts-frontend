import { Component, OnInit, Input } from '@angular/core';
import { IconPosition } from '../home.component';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss']
})
export class HomeFeatureComponent implements OnInit {

  @Input() public title: string;
  @Input() public icon: string;
  @Input() public text: string;
  @Input() public iconPosition: IconPosition;

  constructor() { }

  ngOnInit() {
  }

}
