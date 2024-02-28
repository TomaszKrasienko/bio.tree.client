import { Routes } from '@angular/router';
import {SignInComponent} from "./core/components/user/sign-in/sign-in.component";
import {SignUpComponent} from "./core/components/user/sign-up/sign-up.component";
import {VerifyAccountComponent} from "./core/components/user/verify-account/verify-account.component";

export const routes: Routes = [
  {path:'users/sign-in', component: SignInComponent},
  {path:'users/sign-up', component: SignUpComponent},
  {path:'users/verify-account', component: VerifyAccountComponent},
];
