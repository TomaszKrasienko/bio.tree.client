import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let authService = inject(AuthService);
  let router = inject(Router);
  let accessToken = authService.getToken();

  let authReq = req.clone({
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    },
  });

  return next(authReq).pipe(tap(() => {},
    (error) => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){
          authService.removeToken();
          router.navigate(['users/sign-in']).then();
        }
        return;
      }
    }));
};
