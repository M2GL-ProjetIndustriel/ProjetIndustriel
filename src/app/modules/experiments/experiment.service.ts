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
 * Experiment service, handle the http request to the backend to retrieve
 * experiments data.
 *
 * If a request fails will try up to 3 more time for a total of 4 tries,
 * if the 4 tries fails will throw an error.
 *
 * The number of retry is configurable in the config file ({@link appConfig}).
 */
@Injectable()
export class ExperimentService {
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
	 * Function requesting a list of experiments. Take a page number and a
	 * page size as parameters for pagination, and a sort colomn and a sort
	 * order (asc or desc) for sorting purpose should return the experiments of
	 * the corresponding page sorted in the requested order.
	 * @param  pageIndex Number of the page requested.
	 * @param  pageSize  Size of a page.
	 * @param  sort      Sorting preference of the request.
	 * @param  order     Sorting order (asc or desc).
	 * @return 			 Return an observable to subscribe to.
	 */
	getExperiments(pageIndex?: number, pageSize?: number, sort?: string, order?: string) {
		let params = new HttpParams()
		params = params.append('pageIndex', (pageIndex) ? pageIndex.toString() : '')
		params = params.append('page_size', (pageSize) ? pageSize.toString() : '')
		params = params.append('sort', (sort) ? sort : '')
		params = params.append('order', (order) ? order : '')

		return this.http.get(appConfig.apiUrl + '/experiment', { params: params })
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Function requesting a specific experiment. Take the requested experiment
	 * ID as a parameter.
	 * @param  experimentID Id of the experiment requested.
	 * @return            Return an observable to subscribe to.
	 */
	getExperiment(experimentID: string) {
		return this.http.get(appConfig.apiUrl + '/experiment/' + experimentID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Post request to create a new experiment with data.
	 * @param  data Data to post.
	 * @return      Return an observable to subscribe to.
	 */
	postExperiment(data: any) {
		return this.http.post(appConfig.apiUrl + '/experiment', data)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Put request to update an existing experiment with the new data.
	 * @param  data       Data to update.
	 * @param  experimentID Id of the experiment to update.
	 * @return            Return an observable to subscribe to.
	 */
	editExperiment(data: any, experimentID: string) {
		return this.http.put(appConfig.apiUrl + '/experiment/' + experimentID, data)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Request an experiment to be deleted.
	 * @param  experimentID Id of the experiment to be deleted.
	 * @return            Return an observable to subscribe to.
	 */
	deleteExperiment(experimentID: string) {
		return this.http.delete(appConfig.apiUrl + '/experiment/' + experimentID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}
}
