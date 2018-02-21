import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExperimentsComponent } from './components/experiments.component'

export const experimentsRoutes: Routes = [
	{
		path: 'experiment',
		component: ExperimentsComponent
	}
]
