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
	 * Custom quality error messages
	 */
	qualityErrorMessages: Array<string> = [
		'( ͡° ͜ʖ ͡°)',
		'(⌐■_■)',
		'¯\\_ツ_/¯',
		'ಠ_ಠ',
		'┌(° ͜ʖ͡°)┘',
		'( ͡☉ ͜ʖ ͡☉)',
		'(ง ͡ʘ ͜ʖ ͡ʘ)ง',
		'(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ',
		'（╯°□°）╯︵┻┻'
	]

	/**
	 * Error handler, basically display a message to the user, the message
	 * depends of the type of error and should not be too specific.
	 * @param  error An error.
	 */
	handleError(error: any) {
		if (error instanceof HttpErrorResponse)
			this.errors.next('Le backend a chier dans la colle ' + this.getQualityErrorMessage() + ', veuillez réessayer. CODE: ' + (error as HttpErrorResponse).status)
		else if (error instanceof TypeError)
			this.errors.next('Erreur de typage ' + this.getQualityErrorMessage())
		else if (error instanceof Error)
			this.errors.next('Erreur: ' + (error.message.length > 25) ?  error.message.slice(0, 25) + '...' : error.message + this.getQualityErrorMessage())
		else
			this.errors.next('Une erreur chelou est survenu ' + this.getQualityErrorMessage())
	}

	/**
	 * Function returning a quality error message.
	 * @return A quality error message.
	 */
	getQualityErrorMessage() {
		return this.qualityErrorMessages[Math.floor(Math.random() * this.qualityErrorMessages.length)]
	}
}
