import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'

import 'rxjs/add/operator/map'

import { Experiment } from '../experiment'
import { ExperimentService } from '../experiment.service'
import { ErrorService } from '../../../shared/error.service'

@Component({
	selector: 'experiment',
	templateUrl: './experiment.component.html',
	styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit, OnDestroy {

	experiment: Experiment

	subscriptions = []

	constructor (
		private route: ActivatedRoute,
		private experimentService: ExperimentService,
		private errorService: ErrorService
	) {}

	ngOnInit () {
		this.route.params.subscribe(
			params => this.experimentService.getExperiment(params['experimentID']).subscribe(
				data => console.log('data'),
				err => console.log('err')
			)
		)
	}

	ngOnDestroy () {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe()
		})
	}
}
