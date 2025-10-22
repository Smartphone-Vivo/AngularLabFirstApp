import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  // http://localhost:8080/api/auth/login
  private springUrl = 'http://localhost:8080/api'

  cookieService = inject(CookieService)


  token: string | null = null
  refreshToken: string | null = null
  role: string | null = null



  getDecodedAccessToken(token: string) : any{
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
      console.log('decoded token',this.role)
    }
    return !!this.token
  }

  getRole(){
    if(this.isAuth){
      this.token = this.cookieService.get('token')
      return this.getDecodedAccessToken(this.token).roles
    }
  }

  http = inject(HttpClient)

  login(payload:{username: string, password: string}){
    // console.log('huuuuuuuuuuuuuui',payload, 'login')
    return this.http.post<TokenResponse>(`http://localhost:8080/api/auth/login`,
      payload)
      .pipe(
        tap(val => {
          this.token = val.accessToken
          this.refreshToken = val.refreshToken

          this.role = this.getDecodedAccessToken(this.token).roles

          this.cookieService.set('token', this.token)
          this.cookieService.set('refreshToken', this.refreshToken)
        })
      )
  }

  register(payload:{username: string, password: string}){
    // console.log(payload, 'register')
    return this.http.post(`http://localhost:8080/api/auth/register`, payload)
  }
}
