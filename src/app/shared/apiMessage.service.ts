import { Injectable } from '@angular/core'

/**
 * Service handling the response messages of the backend.
 */
@Injectable()
export class ApiMessageService {
	/**
	 * Process a message received by the backend. Currently check if the
	 * message contian an error and throw that error or if there's data
	 * return the data. If there's no data nor error will also throw an
	 * error.
	 * @param  message Message received from the backend.
	 * @return         Return the data of the message or throw an error.
	 */
	handleMessage(message: any) {
		console.log(message)
		if (message.error)
			throw new Error(message.error.message)
		if (!message.data)
			throw new Error('Expected data inside the response but none was found.')
		return message.data
	}
}
