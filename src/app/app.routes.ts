import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { experimentsRoutes } from './modules/experiments/experiments.routes'

import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'

export const appRoutes: Routes = [
	...experimentsRoutes,
	{
		path: '**',
		component: UnluckyRouteComponent
	}
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes)
