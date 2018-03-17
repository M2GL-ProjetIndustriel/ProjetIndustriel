import { Routes } from '@angular/router'

import { AdminAccessGuard } from '../authentication/adminAccess.guard'

import { InstancesOverviewComponent } from './components/instancesOverview.component'

/**
 * Routes of the instances module.
 */
export const instancesRoutes: Routes = [
	{
		path: 'instance',
		component: InstancesOverviewComponent
	},
	{
		path: 'instance/:instanceID',
		component: InstancesOverviewComponent
	},
	{
		path: 'instance/add',
		component: InstancesOverviewComponent,
		canActivate: [AdminAccessGuard]
	},
	{
		path: 'intance/edit/:instanceID',
		component: InstancesOverviewComponent,
		canActivate: [AdminAccessGuard]
	}
]
