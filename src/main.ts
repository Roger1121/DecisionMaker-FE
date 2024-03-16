import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {enableProdMode, importProvidersFrom} from "@angular/core";
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {AuthInterceptor} from "./app/shared/interceptors/auth.interceptor";
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";

enableProdMode();
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService, provideAnimations()],
}).catch((err) => console.error(err));
