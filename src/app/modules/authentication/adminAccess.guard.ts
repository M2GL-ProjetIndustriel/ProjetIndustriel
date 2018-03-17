import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

import { map } from 'rxjs/operators'

import { AuthenticationService } from './authentication.service'

@Injectable()
export class AdminAccessGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthenticationService
	) {}

	canActivate() {
		return this.authService.getUserStream()
			.asObservable().pipe(
				map(
					(data: any) => {
						if (data.accessLevel && data.accessLevel === 'admin')
							return true
						this.router.navigate(['/home'])
						return false
					}
				)
			)
	}

}
