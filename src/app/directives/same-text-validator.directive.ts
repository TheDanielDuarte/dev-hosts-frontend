import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSameText][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SameTextValidatorDirective
    }
  ]
})
export class SameTextValidatorDirective implements Validator {
  @Input() private appSameText: string;

  constructor() { }

  validate(control: AbstractControl) {
    const areTheSame = control.value === this.appSameText;
    return !areTheSame ? { sameText: { value: control.value } } : null;
  }
}
