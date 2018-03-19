import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MatDialog } from '@angular/material'

import { ExperimentService } from '../experiment.service'

/**
 * Experiment details component, display the details of the experiment and allow
 * edition and deletion of said experiment.
 */
@Component({
	selector: 'experiment-details',
	templateUrl: './experimentDetails.component.html',
	styleUrls: ['./experimentDetails.component.scss']
})
export class ExperimentDetailsComponent implements OnInit, OnDestroy {
	/**
	 * Experiment to be displayed.
	 */
	experiment: any
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []
	/**
	 * Reference to the current user, null = not logged in.
	 */
	user: any = null

	/**
	 * Constructor, doesn't do shit.
	 * @param route             ActivatedRoute injection.
	 * @param router            Router injection.
	 * @param dialog            MatDialog injection.
	 * @param authService       AuthenticationService injection.
	 * @param experimentService ExperimentService injection.
	 */
	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private experimentService: ExperimentService
	) {}

	/**
	 * On init retrieve data of the experiment using the experimentID route
	 * param, if no param found or if there's an error with the http request
	 * the back function is called to return the the experiments list.
	 */
	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => this.experimentService.getExperiment(params['experimentID']).subscribe(
				data => this.experiment = data,
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
	 * Use router to go back to the experiments list.
	 */
	back() {
		this.router.navigate(['/experiment'])
	}

	/**
	 * Event handler called when the delete button is clicked. Display a dialog
	 * box to confirm, if the dialog box result is positive the
	 * experimentService is called to delete the experiment, the user is
	 * redirected to the experiments list once the deletion is done.
	 */
	onDelete() {
		let dialogRef = this.dialog.open(DeleteExperimentDialogComponent)

		dialogRef.afterClosed().subscribe(
			result => {
				if (result === true)
					this.experimentService.deleteExperiment(this.experiment.id).subscribe(
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
 * Component to be displayed inside a dialog box to confirm the deletion of an
 * experiment.
 */
@Component({
	template: `
	<h2 mat-dialog-title>Supprimer expérimentation</h2>
	<mat-dialog-content><p>Êtes-vous sûr de vouloir supprimer cette expérimentation ?</p></mat-dialog-content>
	<mat-dialog-actions>
		<button mat-raised-button color="warn" mat-dialog-close>Annuler</button>
		<button mat-raised-button color="primary" [mat-dialog-close]="true">Valider</button>
	</mat-dialog-actions>
	`
})
export class DeleteExperimentDialogComponent {}
