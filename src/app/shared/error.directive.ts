import { Directive } from '@angular/core'
import { MatSnackBar } from '@angular/material'

import { ErrorService } from './error.service'

/**
 * Attribute directive responsible for displaying error in a snackBar;
 */
@Directive({
	selector: '[appError]'
})
export class ErrorDirective {
	/**
	 * Constructor, subscribe to {@link ErrorService} subject and display
	 * a snackBar when a new error arise.
	 * @param errors   ErrorService injection.
	 * @param snackBar Snackbar component/module (idk).
	 */
	constructor(private errors: ErrorService, public snackBar: MatSnackBar) {
		this.errors.errors.subscribe(
			data => {
				this.snackBar.open(data, 'OK', { duration: 30000 })
			},
			err => { throw err }
		)
	}
}
