import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {SignInModel} from "../../../models/auth/signIn.Model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {AuthService} from "../../../services/auth/auth.service";
import {TokenModel} from "../../../models/auth/token.Model";
import {ErrorModel} from "../../../models/Error.Model";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../../shared/components/alert/alert.component";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    MatLabel,
    MatError,
    AlertComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInModel: Partial<SignInModel> = {};
  @ViewChild(AlertComponent) alertProvider: AlertComponent;

  signInForm = this.formBuilder.group({
    email: [this.signInModel.email, [Validators.required, Validators.email]],
    password: [this.signInModel.password, [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router) {
  }

  getEmailErrorMessage(): string{
    if(this.isRaisedInput('email')){
      if(this.signInForm.get('email')?.hasError('required')){
        return 'Email is required';
      }

      if(this.signInForm.get('email')?.hasError('email')){
        return 'Email is incorrect';
      }
    }
    return '';
  }

  getPasswordErrorMessage(): string{
    if(this.isRaisedInput('password')){
      if(this.signInForm.get('password')?.hasError('required')){
        return 'Password is required';
      }
    }
    return '';
  }

  private isRaisedInput(fieldName: string): boolean {
    let isTouched = this.signInForm.get(fieldName)!.touched;
    let isDirty = this.signInForm.get(fieldName)!.dirty;
    return isTouched || isDirty;
  }

  isAllFormsValid(): boolean{
    return this.signInForm.status === 'VALID';
  }

  submit(): void{
    this.authService.signIn(this.signInForm.value as SignInModel)
      .subscribe((result: TokenModel) => {
        this.authService.saveToken(result.token);
        this.router.navigate(['/']);
      }, ((error) => {
        this.alertProvider?.showAlertWithStrongText("There was an error!", error.error.message);
      }));
  }
}
