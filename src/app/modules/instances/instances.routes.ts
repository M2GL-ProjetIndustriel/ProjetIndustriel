import { Routes } from '@angular/router'

import { AdminAccessGuard } from '../authentication/adminAccess.guard'

import { InstancesOverviewComponent } from './components/instancesOverview.component'
import { InstanceDetailsComponent } from './components/instanceDetails.component'
import { InstanceFormComponent } from './components/instanceForm.component'

/**
 * Routes of the instances module.
 */
export const instancesRoutes: Routes = [
	{
		path: 'instance',
		component: InstancesOverviewComponent
	},
	{
		path: 'instance/add',
		component: InstanceFormComponent,
		canActivate: [AdminAccessGuard]
	},
	{
		path: 'instance/:instanceID',
		component: InstanceDetailsComponent
	},
	{
		path: 'intance/edit/:instanceID',
		component: InstanceFormComponent,
		canActivate: [AdminAccessGuard]
	}
]
