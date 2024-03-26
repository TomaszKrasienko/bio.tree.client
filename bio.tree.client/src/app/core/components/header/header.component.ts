import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {UserIdentity} from "../../models/users/user.Identity";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatMenuTrigger,
    RouterLink,
    AlertComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnChanges {

  user: UserIdentity;
  isAuthenticated: boolean = false;
  @ViewChild(AlertComponent) alertProvider: AlertComponent;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    }

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
    {
      this.isAuthenticated = true;
      this.authService.getUser()
        .subscribe((result) => {
          this.user = result;
        }, (error) => {
          this.alertProvider.showAlertWithStrongText('There was an error!',
            error.error.message);
        })
    }
    else{
      this.isAuthenticated = false;
    }
  }

  signOut(): void{
    this.authService.signOut();
    this.isAuthenticated = false;
    this.router.navigate(['/']).then();
  }

}
