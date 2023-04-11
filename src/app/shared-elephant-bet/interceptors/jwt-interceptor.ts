import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	apiUrl = environment.apiUrl;

	constructor(private loginService: LoginService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.loginService.recupererToken();
		const isApiUrl = request.url.startsWith(this.apiUrl);
		if (token && isApiUrl) {
			request = request.clone({
				setHeaders: { Authorization: token }
			});
		}
		return next.handle(request);
	}
}
