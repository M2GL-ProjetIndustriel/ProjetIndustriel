import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExperimentsOverviewComponent } from './components/experimentsOverview.component'
import { ExperimentDetailsComponent } from './components/experimentDetails.component'

export const experimentsRoutes: Routes = [
	{
		path: 'experiment',
		component: ExperimentsOverviewComponent
	},
	{
		path: 'experiment/:experimentID',
		component: ExperimentDetailsComponent
	}
]
