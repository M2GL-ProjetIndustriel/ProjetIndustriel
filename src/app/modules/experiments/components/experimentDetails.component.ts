import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'

import { Experiment } from '../experiment'
import { ExperimentService } from '../experiment.service'

@Component({
	selector: 'experiment-details',
	templateUrl: './experimentDetails.component.html',
	styleUrls: ['./experimentDetails.component.scss']
})
export class ExperimentDetailsComponent implements OnInit, OnDestroy {

	experiment: Experiment

	subscriptions = []

	constructor(
		private route: ActivatedRoute,
		private experimentService: ExperimentService
	) {}

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => this.experimentService.getExperiment(params['experimentID']).subscribe(
				data => this.experiment = data,
				err => { throw err }
			)
		))
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe()
		})
	}
}
