import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
	constructor(private loginService: LoginService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request.clone({
			headers: request.headers.set('Authorization', this.loginService.recupererToken())
		});
		return next.handle(request);
	}
}
