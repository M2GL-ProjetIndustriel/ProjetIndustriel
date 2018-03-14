import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { experimentsRoutes } from './modules/experiments/experiments.routes'
import { instancesRoutes } from './modules/instances/instances.routes'
import { solversRoutes } from './modules/solvers/solvers.routes'

import { AppLoginComponent } from './components/app-login.component'
import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'

import { AppAuthenticationGuard } from './app-authentication.guard'

/**
 * Routes of the app, some routes are imported from other modules.
 */
export const appRoutes: Routes = [
	{
		path: '',
		canActivate: [AppAuthenticationGuard],
		children: [
			...experimentsRoutes,
			...instancesRoutes,
			...solversRoutes
		]
	},
	{
		path: 'login',
		component: AppLoginComponent
	},
	{
		path: '**',
		component: UnluckyRouteComponent
	}
]

/**
 * Register the routes.
 */
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes)
