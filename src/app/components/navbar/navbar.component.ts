import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressBarService } from '@services/progress-bar.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public progressBar: ProgressBarService) { }

  ngOnInit() {
  }
}
