import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { finalize, filter } from 'rxjs/operators';
import { ProgressBarService } from '@services/progress-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private firstPage = true;
  public firstPageFilled = false;
  public complition = { done: false, successful: false, errors: [] };
  public user = new User(0, new Date(), new Date(), '', '', '', '', 0);
  public passwordConfirmation;
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

  public get currentPage() {
    return this.firstPage ? 'first' : 'second';
  }

  public onSubmit(form: NgForm) {
    if (this.firstPage) {
      this.firstPage = !this.firstPage;
      this.firstPageFilled = true;
      this.user = { ...this.user, firstName: form.value.firstName, lastName: form.value.lastName };
      return;
    }
    this.user = { ...this.user, email: form.value.email, password: form.value.password };
    this.serverResponse = this.auth.registerUser(this.user)
    .pipe(
      finalize(() => {
        this.progressBar.changeState(false);
        this.complition.done = true;
        this.renderer.addClass(this.element.nativeElement, 'done-registering');
      })
    )
    .subscribe((res) => this.onFinishedRegistration(res), (res) => this.onFinishedRegistration(res));
  }

  public onFinishedRegistration(res: { successful: boolean, errors: any[] }) {
    this.complition.successful = res.successful;
    this.complition.errors = res.errors.map(error => error.message);
  }

  public changePage(e: Event, form: NgForm) {
    if (!this.firstPage) {
      const { email: emailControl, password: pwdControl, passwordConfirmation: pwdConfControl } = form.controls;
      this.user = { ...this.user, email: emailControl.value, password: pwdControl.value  };
      this.passwordConfirmation = pwdConfControl.value;
      this.firstPage = true;
    } else if (this.firstPage && this.firstPageFilled) {
      this.firstPage = false;
    } else {
      e.preventDefault();
    }
  }

  public reset() {
    this.firstPage = true;
    this.complition = { done: false, successful: false, errors: [] };
    this.renderer.removeClass(this.element.nativeElement, 'done-registering');
    this.passwordConfirmation = null;
  }
}
