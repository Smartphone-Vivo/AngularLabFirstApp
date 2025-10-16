import {AuthService} from './auth-service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const canActivateAuth = () => {
  const idLoggedIn = inject(AuthService).isAuth

  if(idLoggedIn){
    return true
  }

  return inject(Router).createUrlTree(['/login'])
}
