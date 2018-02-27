import { Routes } from '@angular/router'

import { ExperimentsOverviewComponent } from './components/experimentsOverview.component'
import { ExperimentDetailsComponent } from './components/experimentDetails.component'

/**
 * Routes of the experiment module.
 */
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
