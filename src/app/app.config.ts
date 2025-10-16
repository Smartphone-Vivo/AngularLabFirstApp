import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import {HttpClientInMemoryWebApiModule, InMemoryDbService} from "angular-in-memory-web-api";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authTokenInterceptor} from './auth/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    // HttpClientInMemoryWebApiModule.forRoot(
    //     InMemoryDataService,
    //     { dataEncapsulation: false }
    // ).providers!

  ]
};
