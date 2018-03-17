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

	user: any = null

	constructor(private authService: AuthenticationService) {
		this.authService.getUserStream().subscribe(
			data => this.user = data,
			err => { throw err }
		)
	}
}
