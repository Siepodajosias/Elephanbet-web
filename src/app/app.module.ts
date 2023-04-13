import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToolbarModule } from 'primeng/toolbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
//components
import { AppComponent } from './app.component';
import { PageLoaderComponent } from './shared-elephant-bet/composants/page-loader/page-loader.component';
import { ApiUrlInterceptor } from 'src/app/shared-elephant-bet/interceptors/api-url-interceptor';
import { JwtInterceptor } from 'src/app/shared-elephant-bet/interceptors/jwt-interceptor';
import { RippleModule } from 'primeng/ripple';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import localePt from '@angular/common/locales/pt';
import localeFr from '@angular/common/locales/fr';
import { DropdownModule } from 'primeng/dropdown';
import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { MainPageComponent } from 'src/app/shared-elephant-bet/composants/main-page/main-page.component';
import { SidebarComponent } from 'src/app/shared-elephant-bet/composants/sidebar/sidebar.component';
import { SublevelMenuComponent } from 'src/app/shared-elephant-bet/composants/sidebar/sublevel-menu.component';
import { PageContenerComponent } from 'src/app/shared-elephant-bet/composants/page-contener/page-contener.component';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from 'src/app/shared-elephant-bet/interceptors/timeout-interceptor.service';

registerLocaleData(localePt);
registerLocaleData(localeFr);

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export function tokenGetter(): string {
	const token = localStorage.getItem('token');
	return token ? token : '';
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PageLoaderComponent,
		MainPageComponent,
		SidebarComponent,
		SublevelMenuComponent,
		PageContenerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		LoadingBarRouterModule,
		CardModule,
		DialogModule,
		AutoCompleteModule,
		ReactiveFormsModule,
		InputTextModule,
		ToolbarModule,
		MenuModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		JwtModule.forRoot({
			config: { tokenGetter: tokenGetter }
		}),
		RippleModule,
		DropdownModule,
		MessageModule,
		TooltipModule,
		CalendarModule,
		ProgressSpinnerModule,
		PasswordModule
	],
	providers: [
		AuthGuard,
		LoginService,
		JwtHelperService,
		{ provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
		{ provide: DEFAULT_TIMEOUT, useValue: 60000 },
		{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap: [AppComponent]
})
export class AppModule {
}
