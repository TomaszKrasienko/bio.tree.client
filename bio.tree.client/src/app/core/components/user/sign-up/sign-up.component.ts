import {Component, ViewChild} from '@angular/core';
import {AlertComponent} from "../../../../shared/components/alert/alert.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMiniFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SignUpModel} from "../../../models/auth/signUp.Model";
import {passwordConfirmationValidator} from "../../../../shared/validators/passwordConfirmationValidator";
import {concatWith} from "rxjs";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AlertComponent,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpModel: Partial<SignUpModel> = {};
  @ViewChild(AlertComponent) alertProvider: AlertComponent;

  signUpForm = this.formBuilder.group({
    email: [this.signUpModel.email, [Validators.required, Validators.email]],
    firstName: [this.signUpModel.firstName, [Validators.required]],
    lastName: [this.signUpModel.lastName, [Validators.required]],
    nickname: [this.signUpModel.nickName, [Validators.required]],
    password: [this.signUpModel.password, [Validators.required]],
    passwordConfirmation: ['', [Validators.required]]
  }, {validators: passwordConfirmationValidator()});

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService) {
  }

  getEmailErrorMessage(): string{
    if(this.isRaisedInput('email')){
      if(this.signUpForm.get('email')?.hasError('required')){
        return 'Email is required';
      }

      if(this.signUpForm.get('email')?.hasError('email')){
        return 'Email is incorrect';
      }
    }
    return '';
  }

  getRequiredTextInputMessage(name: string): string{
    if(this.isRaisedInput(name)){
      if(this.signUpForm.get(name)?.hasError('required')){
        return `Field is required`;
      }
    }
    return '';
  }

  getPasswordConfirmationMessage(): string {
    if(this.isRaisedInput('passwordConfirmation') || this.isRaisedInput('password')){
      if(this.signUpForm.hasError('passwordConfirmation') && this.signUpForm.get('passwordConfirmation')?.value?.length != 0){
        this.signUpForm.get('passwordConfirmation')?.setErrors({'notMatch':true})
        return 'Password does not match'
      }
    }
    return '';
  }

  private isRaisedInput(fieldName: string): boolean {
    let isTouched = this.signUpForm.get(fieldName)!.touched;
    let isDirty = this.signUpForm.get(fieldName)!.dirty;
    return isTouched || isDirty;
  }

  isAllFormsValid(): boolean{
    return this.signUpForm.status === 'VALID';
  }
  submit(): void{
    let signUpModel = this.signUpForm.value as SignUpModel;
    let title = 'Thank you for registration';
    let description = 'Now, please confirm your account by email';
    let redirectUrl = '/';
    let buttonText = 'Home';
    this.authService.signUp(signUpModel)
      .subscribe(result => {
        this.router.navigate([`/announcement`],{
          queryParams: {
            title: title,
            description: description,
            buttonText: buttonText
          }
        }).then();
      }, error => {
        this.alertProvider.showAlertWithStrongText('There was an error!',
          error.error.message);
      })
  }
}
