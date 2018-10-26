import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {AuthInterceptor} from "./auth/auth-interceptor";

@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		MessagesComponent,
		DashboardComponent,
		HeroSearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
		],
	bootstrap: [AppComponent]
})
export class AppModule {
}
