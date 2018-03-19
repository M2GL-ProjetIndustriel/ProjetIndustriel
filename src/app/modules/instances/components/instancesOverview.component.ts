import { Component } from '@angular/core'

import { AuthenticationService } from '../../authentication/authentication.service'

/**
 * Instance overview component, display a list of instance and a button to add a new
 * instance.
 */
@Component({
	selector: 'instances-overview',
	templateUrl: 'instancesOverview.component.html',
	styleUrls: ['instancesOverview.component.scss']
})
export class InstancesOverviewComponent {
	/**
	 * Current user (null = not logged in)
	 */
	user: any = null

	/**
	 * Constructor, subscribe to authService user stream to get the current user.
	 * @param authService AuthenticationService injection.
	 */
	constructor(private authService: AuthenticationService) {
		this.authService.getUserStream().subscribe(
			data => this.user = data,
			err => { throw err }
		)
	}
}
