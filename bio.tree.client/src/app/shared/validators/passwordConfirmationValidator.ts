import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordConfirmationValidator(): ValidatorFn{
  return (control:AbstractControl) : ValidationErrors | null => {
    let password = control.get('password')?.value;
    let passwordConfirmation = control.get('passwordConfirmation')?.value;

    const passwordValid: boolean = password === passwordConfirmation;
    return !passwordValid ? {passwordConfirmation:true} : null;
  }
}
