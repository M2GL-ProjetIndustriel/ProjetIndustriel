import { Routes } from '@angular/router'

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
	}
]
