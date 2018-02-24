import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { experimentsRoutes } from './modules/experiments/experiments.routes'

import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'

/**
 * Routes of the app, some routes are imported from other modules.
 */
export const appRoutes: Routes = [
	...experimentsRoutes,
	{
		path: '**',
		component: UnluckyRouteComponent
	}
]

/**
 * Register the routes.
 */
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes)
