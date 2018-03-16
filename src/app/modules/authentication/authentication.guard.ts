import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthenticationGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthenticationService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authService.isLoggedIn())
			return true

		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
		return false
	}

}
