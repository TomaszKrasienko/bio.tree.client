import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInModel} from "../../models/auth/signIn.Model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'AuthToken';
  constructor(private httpClient: HttpClient) { }

  signIn(signIn: SignInModel): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/users/sign-in`, signIn);
  }

  saveToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }
}
