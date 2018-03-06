import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

import { Solver } from '../solver.model'
import { SolverService } from '../solver.service'

@Component({
	selector: 'solver-details',
	templateUrl: './solverDetails.component.html',
	styleUrls: ['./solverDetails.component.scss']
})
export class SolverDetailsComponent implements OnInit, OnDestroy {

	solver: Solver

	subscriptions = []

	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private solverService: SolverService
	) {}

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => this.solverService.getSolver(params['solverID']).subscribe(
				data => this.solver = data,
				err => { throw err }
			),
			err => {
				this.back()
				throw err
			}
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

	back() {
		this.router.navigate(['/solver'])
	}

	//TODO: dialog box ?
	onDelete() {
		this.solverService.deleteSolver(this.solver.id).subscribe(
			data => this.back(),
			err => {
				this.back()
				throw err
			}
		)
	}
}
