import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth-service';
import {catchError, switchMap, throwError} from 'rxjs';

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = inject(AuthService).token

  if(!token) return next(req)

  const addToken = (req: HttpRequest<any>, token: String) => {
      return req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
  }

  const refreshAndProceed = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ) => {
    if(!isRefreshing){
      isRefreshing = true
      return authService.refreshAuthToken()
        .pipe(
          switchMap(res => {
            isRefreshing = false
            return next(addToken(req, res.accessToken))
          })
        )
    }
    return next(addToken(req, authService.token!)
    )
  }

  return next(addToken(req, token)).pipe(
    catchError(error => {
      if(error.status === 403){
        return refreshAndProceed(authService, req, next)
      }

      return throwError(error)
    })
  )

}
