import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProgressBarService } from '@services/progress-bar.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  public complition = { done: false, errors: [] };
  public user = new User(0, new Date(), new Date(), '', '', '', '', 0);
  private serverResponse?: Subscription;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router,
    private progressBar: ProgressBarService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.serverResponse) {
      this.serverResponse.unsubscribe();
    }
  }

  public onSubmit(form: NgForm) {
    this.user = { ...this.user, email: form.value.email, password: form.value.password };
    this.serverResponse = this.auth.loginUser(this.user)
      .subscribe((res) => {
        this.progressBar.changeState(false);
        this.router.navigate(['/home']);
      }, (res) => {
        this.complition.done = true;
        this.complition.errors = res.errors;
        this.renderer.addClass(this.element.nativeElement, 'failed-authenticating');
        this.progressBar.changeState(false);
      });
  }

  public reset() {
    this.complition = { done: false, errors: [] };
    this.renderer.removeClass(this.element.nativeElement, 'failed-authenticating');
  }
}
