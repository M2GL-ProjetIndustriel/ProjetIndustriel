import { Routes } from '@angular/router'

import { SolversOverviewComponent } from './components/solversOverview.component'
import { SolverFormComponent } from './components/solverForm.component'

/**
 * Routes of the solvers module.
 */
export const solversRoutes: Routes = [
	{
		path: 'solver',
		component: SolverFormComponent
	},
	{
		path: 'solver/:solverID',
		component: SolversOverviewComponent
	}
]
