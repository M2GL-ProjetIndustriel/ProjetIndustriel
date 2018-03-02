import { Routes } from '@angular/router'

import { SolversOverviewComponent } from './components/solversOverview.component'
import { SolverFormComponent } from './components/solverForm.component'
import { SolverDetailsComponent } from './components/solverDetails.component'

/**
 * Routes of the solvers module.
 */
export const solversRoutes: Routes = [
	{
		path: 'solver',
		component: SolversOverviewComponent
	},
	{
		path: 'solver/add',
		component: SolverFormComponent
	},
	{
		path: 'solver/edit/:solverID',
		component: SolverFormComponent
	},
	{
		path: 'solver/:solverID',
		component: SolverDetailsComponent
	}
]
