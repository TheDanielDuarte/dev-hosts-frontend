import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private firstPage = true;
  public firstPageFilled = false;
  public complition = { done: false, successful: false, error: null };
  public user = { firstName: '', lastName: '', email: '', password: '' };
  public passwordConfirmation: string;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  public get currentPage() {
    return this.firstPage ? 'first' : 'second';
  }

  public onSubmit(form: NgForm) {
    if (this.firstPage) {
      this.firstPage = !this.firstPage;
      this.firstPageFilled = true;
      this.user = { ...this.user, firstName: form.value.firstName, lastName: form.value.lastName };
      form.reset();
      return;
    }
    this.user = { ...this.user, email: form.value.email, password: form.value.password };
    this.complition.done = true;
    this.complition.successful = false;
    this.complition.error = 'Dummy error';
    this.renderer.addClass(this.element.nativeElement, 'done-registering');
    form.reset();
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
    this.complition = { done: false, successful: false, error: null };
    this.renderer.removeClass(this.element.nativeElement, 'done-registering');
    this.passwordConfirmation = null;
  }
}
