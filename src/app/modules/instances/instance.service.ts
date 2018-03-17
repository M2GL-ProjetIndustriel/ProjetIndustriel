import { Injectable } from '@angular/core'
import {
	HttpClient,
	HttpParams,
	HttpRequest
} from '@angular/common/http'

import { catchError, retry, map, tap, last } from 'rxjs/operators'

import { ApiMessageService } from '../../shared/apiMessage.service'
import { appConfig } from '../../config'

/**
 * Instance service, handle the http request to the backend to retrieve
 * instances data.
 *
 * If a request fails will try up to 3 more time for a total of 4 tries,
 * if the 4 tries fails will throw an error.
 *
 * The number of retry is configurable in the config file ({@link appConfig}).
 */
@Injectable()
export class InstanceService {
	/**
	 * Constructor, doesn't do shit.
	 * @param http              HttpClient injection.
	 * @param apiMessageService ApiMessageService injection.
	 */
	constructor (
		private http: HttpClient,
		private apiMessageService: ApiMessageService
	) {}

	/**
	 * Function requesting a list of instances. Take a page number and a
	 * page size as parameters for pagination, and a sort colomn and a sort
	 * order (asc or desc) for sorting purpose should return the instances of
	 * the corresponding page sorted in the requested order.
	 * @param  pageIndex Number of the page requested.
	 * @param  pageSize  Size of a page.
	 * @param  sort      Sorting preference of the request.
	 * @param  order     Sorting order (asc or desc).
	 * @return 			 Return an observable to subscribe to.
	 */
	getInstances(pageIndex?: number, pageSize?: number, sort?: string, order?: string) {
		let params = new HttpParams()
		params = params.append('pageIndex', (pageIndex) ? pageIndex.toString() : '')
		params = params.append('page_size', (pageSize) ? pageSize.toString() : '')
		params = params.append('sort', (sort) ? sort : '')
		params = params.append('order', (order) ? order : '')

		let req = new HttpRequest('GET', appConfig.apiUrl + '/instance', { params: params })

		return this.http.request(req).pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Function requesting a specific instance. Take the requested instance
	 * ID as a parameter.
	 * @param  instanceID Id of the instance requested.
	 * @return            Return an observable to subscribe to.
	 */
	getInstance(instanceID: string) {
		return this.http.get(appConfig.apiUrl + '/instance/' + instanceID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Post request to create a new instance with data.
	 * @param  data Data to post.
	 * @return      Return an observable to subscribe to.
	 */
	postInstance(data: any) {
		return this.http.post(appConfig.apiUrl + '/instance', data)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Put request to update an existing instance with the new data.
	 * @param  data       Data to update.
	 * @param  instanceID Id of the instance to update.
	 * @return            Return an observable to subscribe to.
	 */
	editInstance(data: any, instanceID: string) {
		return this.http.put(appConfig.apiUrl + '/instance/' + instanceID, data)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Request an instance to be deleted.
	 * @param  instanceID Id of the instance to be deleted.
	 * @return            Return an observable to subscribe to.
	 */
	deleteInstance(instanceID: string) {
		return this.http.delete(appConfig.apiUrl + '/isntance/' + instanceID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}
}
