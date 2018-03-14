import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { AppAuthenticationService } from './app-authentication.service'

@Injectable()
export class AppAuthenticationGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AppAuthenticationService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authService.isLoggedIn())
			return true

		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
		return false
	}

}
