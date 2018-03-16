import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { authenticationRoutes } from './modules/authentication/authentication.routes'

import { AppHomeComponent } from './components/app-home.component'
import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'


/**
 * Routes of the app, some routes are imported from other modules.
 */
export const appRoutes: Routes = [
	...authenticationRoutes,
	{
		path: '**',
		component: UnluckyRouteComponent
	}
]

/**
 * Register the routes.
 */
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes)
