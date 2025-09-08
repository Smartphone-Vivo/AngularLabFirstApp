import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import {HttpClientInMemoryWebApiModule, InMemoryDbService} from "angular-in-memory-web-api";
import {provideHttpClient} from "@angular/common/http";
import {InMemoryDataService} from "./service/in-memory-db-service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService,
        { dataEncapsulation: false }
    ).providers!

  ]
};
