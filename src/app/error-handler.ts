import { Injectable, ErrorHandler } from '@angular/core'

import { ReplaySubject } from 'rxjs/ReplaySubject'

import { ErrorService } from './shared/error.service'

/**
 * Replace the default error handler and let the error service handle any
 * error that arise. See {@link ErrorService}.
 */
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

	/**
	 * Call super class Constructor.
	 * @param errorService ErrorService injection.
	 */
	constructor(private errorService: ErrorService) {
		super()
	}

	/**
	 * Call the error service to handle the error, also call the default
	 * error handler.
	 * @param  error An error.
	 */
	handleError(error) {
		super.handleError(error)
		this.errorService.handleError(error)
	}
}
