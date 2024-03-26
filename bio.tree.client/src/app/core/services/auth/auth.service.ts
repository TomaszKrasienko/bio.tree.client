import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInModel} from "../../models/auth/signIn.Model";
import {environment} from "../../../../environments/environment";
import {SignUpModel} from "../../models/auth/signUp.Model";
import {VerifyTokenModel} from "../../models/auth/verifyToken.Model";
import {UserIdentity} from "../../models/users/user.Identity";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'AuthToken';
  constructor(private httpClient: HttpClient) { }

  signIn(signInModel: SignInModel): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/users/sign-in`, signInModel);
  }

  signUp(signUpModel: SignUpModel): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/users/sign-up`, signUpModel);
  }

  signOut(): void{
    this.removeToken();
  }

  verifyToken(verifyTokenModel: VerifyTokenModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/verify`, verifyTokenModel);
  }

  getUser(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/users/me`);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) as string;
  }

  removeToken(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return !(token === null || token === undefined);
  }
}
