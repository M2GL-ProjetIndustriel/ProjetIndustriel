import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'

import 'rxjs/add/operator/map'

import { Experiment } from '../experiment'
import { ExperimentService } from '../experiment.service'

@Component({
	selector: 'experiment-details',
	templateUrl: './experimentDetails.component.html',
	styleUrls: ['./experimentDetails.component.css']
})
export class ExperimentDetailsComponent implements OnInit, OnDestroy {

	experiment: Experiment

	subscriptions = []

	constructor (
		private route: ActivatedRoute,
		private experimentService: ExperimentService
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
