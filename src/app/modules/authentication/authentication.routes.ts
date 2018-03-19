import { Routes } from '@angular/router'

import { AuthenticationGuard } from './authentication.guard'

import { experimentsRoutes } from '../experiments/experiments.routes'
import { instancesRoutes } from '../instances/instances.routes'
import { solversRoutes } from '../solvers/solvers.routes'

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
			...experimentsRoutes,
			...instancesRoutes,
			...solversRoutes,
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
