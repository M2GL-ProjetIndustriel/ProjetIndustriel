import { Routes } from '@angular/router'

import { SolversOverviewComponent } from './components/solversOverview.component'

/**
 * Routes of the solvers module.
 */
export const solversRoutes: Routes = [
	{
		path: 'solver',
		component: SolversOverviewComponent
	},
	{
		path: 'solver/:solverID',
		component: SolversOverviewComponent
	}
]
