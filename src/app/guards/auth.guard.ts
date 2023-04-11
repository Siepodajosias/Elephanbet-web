import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private loginService: LoginService, private route: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = this.loginService.recupererToken();
		if (token == '' || !this.loginService.isAuthenticated()) {
			this.route.navigate(['/login']);
			return false;
		}
		return true;
	}
}
