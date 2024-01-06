import {HttpClientModule} from "@angular/common/http";
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes)],
}).catch((err) => console.error(err));
