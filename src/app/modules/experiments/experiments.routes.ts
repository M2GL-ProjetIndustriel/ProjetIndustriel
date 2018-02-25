import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExperimentsComponent } from './components/experiments.component'
import { ExperimentComponent } from './components/experiment.component'

export const experimentsRoutes: Routes = [
	{
		path: 'experiment',
		component: ExperimentsComponent
	},
	{
		path: 'experiment/:experimentID',
		component: ExperimentComponent
	}
]
