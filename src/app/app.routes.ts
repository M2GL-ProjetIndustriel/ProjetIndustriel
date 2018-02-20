import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'

export const routes: Routes = [
	{
		path: '**',
		component: UnluckyRouteComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
