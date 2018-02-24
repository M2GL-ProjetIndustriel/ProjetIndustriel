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
	 * Constructor, subscribe to ErrorService subject and display a snackBar
	 * when a new error arise. {@link ErrorService}
	 * @param errors   ErrorService injection.
	 * @param snackBar Snackbar component/module (idk).
	 */
	constructor(private errors: ErrorService, public snackBar: MatSnackBar) {
		this.errors.errors.subscribe(
			(value) => {
				this.snackBar.open(value, 'OK', { duration: 3000 })
			},
			(err) => {
				this.errors.newError(err)
			}
		)
	}
}
