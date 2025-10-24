import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Group} from '../models/group';
import {BaseService} from '../service/base-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  // http://localhost:8080/api/auth/login
  private springUrl = 'http://localhost:8080/api'

  cookieService = inject(CookieService)
  router = inject(Router)
  http = inject(HttpClient)


  token: string | null = null
  refreshToken: string | null = null
  role: string | null = null


  logout(){
    this.cookieService.deleteAll()
    this.router.navigate(['/login'])
  }

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

  // username: new FormControl(null, Validators.required),
  // fio: new FormControl(null, Validators.required),
  // phoneNumber: new FormControl(null, Validators.required),
  // group: new FormControl(null, Validators.required),
  // password: new FormControl(null, Validators.required)

  register(payload:{fio: string, group: string, groupId: string, password: string, phoneNumber: string, username: string}){
    console.log(payload, 'register')
    return this.http.post(`http://localhost:8080/api/auth/register`, payload)
  }
}
