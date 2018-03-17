import { Routes } from '@angular/router'

import { AuthenticationGuard } from './authentication.guard'

import { solversRoutes } from '../solvers/solvers.routes'
import { instancesRoutes } from '../instances/instances.routes'

import { LoginComponent } from './components/login.component'
import { AppHomeComponent } from '../../components/app-home.component'

/**
 * Routes of the solvers module.
 */
export const authenticationRoutes: Routes = [
	{
		path: '',
		canActivate: [AuthenticationGuard],
		canActivateChild: [AuthenticationGuard],
		children: [
			...solversRoutes,
			...instancesRoutes,
			{
				path: 'home',
				component: AppHomeComponent

			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	}
]
