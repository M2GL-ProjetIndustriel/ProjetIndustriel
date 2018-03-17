import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MatDialog } from '@angular/material'

import { AuthenticationService } from '../../authentication/authentication.service'
import { InstanceService } from '../instance.service'

/**
 * Instance details component, display the details of the instance and allow
 * edition and deletion of said instance.
 */
@Component({
	selector: 'instance-details',
	templateUrl: './instanceDetails.component.html',
	styleUrls: ['./instanceDetails.component.scss']
})
export class InstanceDetailsComponent implements OnInit, OnDestroy {
	/**
	 * Instance to be displayed.
	 */
	instance: any
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []
	/**
	 * Reference to the current user, null = not logged in.
	 */
	user: any = null

	/**
	 * Constructor, subscribe to authService user stream to get the current user.
	 * @param route           ActivatedRoute injection.
	 * @param router          Router injection.
	 * @param dialog          MatDialog injection.
	 * @param authService     AuthenticationService injection.
	 * @param instanceService InstanceService injection.
	 */
	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private authService: AuthenticationService,
		private instanceService: InstanceService
	) {
		this.authService.getUserStream().subscribe(
			data => this.user = data,
			err => { throw err }
		)
	}

	/**
	 * On init retrieve data of the instance using the instanceID route param,
	 * if no param found or if there's an error with the http request the back
	 * function is called to return the the instances list.
	 */
	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => this.instanceService.getInstance(params['instanceID']).subscribe(
				data => this.instance = data,
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
	 * Use router to go back to the instances list.
	 */
	back() {
		this.router.navigate(['/instance'])
	}

	/**
	 * Event handler called when the delete button is clicked. Display a dialog
	 * box to confirm, if the dialog box result is positive the instanceService
	 * is called to delete the instance, the user is redirected to the instances
	 * list once the deletion is done.
	 */
	onDelete() {
		let dialogRef = this.dialog.open(DeleteInstanceDialogComponent)

		dialogRef.afterClosed().subscribe(
			result => {
				if (result === true)
					this.instanceService.deleteInstance(this.instance.id).subscribe(
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
 * Component to be displayed inside a dialog box to confirm the deletion of a
 * instance.
 */
@Component({
	template: `
	<h2 mat-dialog-title>Supprimer instance</h2>
	<mat-dialog-content><p>Êtes-vous sûr de vouloir supprimer cette instance ?</p></mat-dialog-content>
	<mat-dialog-actions>
		<button mat-raised-button color="warn" mat-dialog-close>Annuler</button>
		<button mat-raised-button color="primary" [mat-dialog-close]="true">Valider</button>
	</mat-dialog-actions>
	`
})
export class DeleteInstanceDialogComponent {}
