import { Routes } from '@angular/router'

import { ExperimentsOverviewComponent } from './components/experimentsOverview.component'
import { ExperimentDetailsComponent } from './components/experimentDetails.component'
import { ExperimentFormComponent } from './components/experimentForm.component'

/**
 * Routes of the experiment module.
 */
export const experimentsRoutes: Routes = [
	{
		path: 'experiment',
		component: ExperimentsOverviewComponent
	},
	{
		path: 'experiment/add',
		component: ExperimentFormComponent
	},
	{
		path: 'experiment/:experimentID',
		component: ExperimentDetailsComponent
	},
	{
		path: 'experiment/edit/:experimentID',
		component: ExperimentFormComponent
	}
]
