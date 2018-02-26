import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'

import { ReplaySubject } from 'rxjs/ReplaySubject'

/**
 * Service handling errors inside the app.
 */
@Injectable()
export class ErrorService {
	/**
	 * Stream of errors.
	 */
	errors: ReplaySubject<string> = new ReplaySubject<string>()

	/**
	 * Error handler, basically display a message to the user, the message
	 * depends of the type of error and should not be too specific.
	 * @param  error An error.
	 */
	handleError (error: any) {
		if (error instanceof HttpErrorResponse)
			this.errors.next('Le backend a chier dans la colle, veuillez réessayer. ¯\\_ツ_/¯ CODE: ' + (error as HttpErrorResponse).status)
		else if (error instanceof TypeError)
			this.errors.next('Erreur de typage ¯\\_ツ_/¯')
		else if (error instanceof Error)
			this.errors.next('Erreur: ' + error.message)
		else
			this.errors.next('Une erreu chelou est survenu ¯\\_ツ_/¯')
	}
}
