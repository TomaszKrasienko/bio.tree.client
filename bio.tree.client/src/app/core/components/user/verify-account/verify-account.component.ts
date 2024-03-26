import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyTokenModel} from "../../../models/auth/verifyToken.Model";
import {AlertComponent} from "../../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    AlertComponent
  ],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit {

  @ViewChild(AlertComponent) alertProvider: AlertComponent;

  constructor(private router: Router, private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.Confirm(params['token'])
    })
  }

  private Confirm(token: string): void{
    let verifyModel: VerifyTokenModel = {
      token: token
    };
    let title = 'Your account is verified';
    let description = 'Now, you can sign-in';
    let redirectUrl = 'users/sign-in';
    let buttonText = 'Sign in';
    this.authService.verifyToken(verifyModel).subscribe((result) => {
      this.router.navigate([`/announcement`],{
        queryParams: {
          title: title,
          description: description,
          redirectUrl: redirectUrl,
          buttonText: buttonText
        }
      }).then();
    }, (error) => {
      this.alertProvider.showAlertWithStrongText('There was an error!',
        error.error.message);
    })
  }
}
