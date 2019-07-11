import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material-module/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UtilService } from './services/util.service';
import {TranslatorService} from './services/translator.service'
import { ActivatePaymentWindowComponent } from './components/activate-payment-window/activate-payment-window.component';
@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    ActivatePaymentWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [UtilService, TranslatorService,CookieService,   {
    //To load Webconfig file in app load
    provide: APP_INITIALIZER,
    useFactory: (util: UtilService) =>
      () => util.loadConfig(),
    deps: [UtilService],
    multi: true
  }],
  bootstrap: [AppComponent],

  entryComponents:[ActivatePaymentWindowComponent]
})
export class AppModule { }

export function TranslationFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}