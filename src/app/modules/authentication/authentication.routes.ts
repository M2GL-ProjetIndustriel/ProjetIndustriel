import { Routes } from '@angular/router'

import { AuthenticationGuard } from './authentication.guard'

import { solversRoutes } from '../solvers/solvers.routes'

import { LoginComponent } from './components/login.component'

/**
 * Routes of the solvers module.
 */
export const authenticationRoutes: Routes = [
	{
		path: '',
		canActivate: [AuthenticationGuard],
		children: [
			...solversRoutes
		]
	},
	{
		path: 'login',
		component: LoginComponent
	}
]
