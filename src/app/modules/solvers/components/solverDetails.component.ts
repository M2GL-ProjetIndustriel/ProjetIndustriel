import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MatDialog } from '@angular/material'

import { SolverService } from '../solver.service'

/**
 * Solver details component, display the details of the component and allow
 * edition and deletion of said solver.
 */
@Component({
	selector: 'solver-details',
	templateUrl: './solverDetails.component.html',
	styleUrls: ['./solverDetails.component.scss']
})
export class SolverDetailsComponent implements OnInit, OnDestroy {
	/**
	 * Solver to be displayed.
	 */
	solver: any
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []

	/**
	 * Constructor, doesn't do shit.
	 * @param route         ActivatedRoute injection.
	 * @param router        Router injection.
	 * @param dialog        MatDialog injection.
	 * @param solverService SolverService injection.
	 */
	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private solverService: SolverService
	) {}

	/**
	 * On init retrieve data of the solver using the solverID route param, if
	 * no param found or if there's an error with the http request the back
	 * function is called to return the the solvers list.
	 */
	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => this.solverService.getSolver(params['solverID']).subscribe(
				data => this.solver = data,
				err => {
					this.back()
					throw err
				}
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

	/**
	 * Use router to go back to the solvers list.
	 */
	back() {
		this.router.navigate(['/solver'])
	}

	/**
	 * Event handler called when the delete button is clicked. Display a dialog
	 * box to confirm, if the dialog box result is positive the solverService is
	 * called to delete the solver, the user is redirected to the solvers list
	 * once the deletion is done.
	 */
	onDelete() {
		let dialogRef = this.dialog.open(DeleteSolverDialogComponent)

		dialogRef.afterClosed().subscribe(
			result => {
				if (result === true)
					this.solverService.deleteSolver(this.solver.id).subscribe(
						data => this.back(),
						err => {
							this.back()
							throw err
						})
			}
		)
	}
}

/**
 * Component to be dispplayed inside a dialog box to confirm the deletion of a
 * solver.
 */
@Component({
	template: `
	<h2 mat-dialog-title>Supprimer solveur</h2>
	<mat-dialog-content><p>Êtes-vous sûr de vouloir supprimer ce solveur ?</p></mat-dialog-content>
	<mat-dialog-actions>
		<button mat-raised-button color="warn" mat-dialog-close>Annuler</button>
		<button mat-raised-button color="primary" [mat-dialog-close]="true">Valider</button>
	</mat-dialog-actions>
	`
})
export class DeleteSolverDialogComponent {}
