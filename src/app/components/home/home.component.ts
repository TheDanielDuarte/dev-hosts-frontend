import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly features: Feature[] = [
    {
      icon: 'vpn_lock',
      title: 'High Security',
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis blanditiis alias nobis iure vitae ratione amet quas placeat,
        doloremque ullam nihil?
      `,
      position: 'left'
    },
    {
      icon: 'access_time',
      title: '24 Hours Support',
      text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Fugit quam eveniet expedita aliquam quia voluptas quasi dolor laboriosam corrupti dicta laborum
      `,
      position: 'right'
    },
    {
      icon: 'payment',
      title: 'Pay As You Go',
      text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quibusdam
        ratione voluptatum libero sequi animi delectus exercitationem labore illum
      `,
      position: 'left'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

interface Feature { icon: string; title: string; text: string; position: IconPosition; }
export type IconPosition = 'left' | 'right';
