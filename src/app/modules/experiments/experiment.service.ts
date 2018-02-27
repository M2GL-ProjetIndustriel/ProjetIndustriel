import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { catchError, retry } from 'rxjs/operators'

import { BasicExperiment, Experiment } from './experiment'
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
	 * @param http HttpClient injection.
	 */
	constructor (
		private http: HttpClient,
		private apiMessageService: ApiMessageService
	) {}

	/**
	 * Function requesting a list of experiments. Take apge number a and a
	 * page size as parameters, if none of them are present the request
	 * should return evry single experiments otherwise should return the
	 * experiments of the corresponding page.
	 * @param  page     Number of the page requested.
	 * @param  pageSize Size of a page.
	 * @return 			Return an observable to subscribe to.
	 */
	getExperiments (page?: number, pageSize?: number, sort?: string) {
		console.log('?page='+page+'&pageSize='+pageSize+'&sort='+sort)
		return this.http.get(appConfig.apiUrl + '/experiment', {
			params: {
				page: (page) ? page.toString() : '',
				pageSize: (pageSize) ? pageSize.toString() : '',
				sort: (sort) ? sort : ''
			}
		}).pipe(
				retry(appConfig.httpFailureRetryNumber),
				catchError(err => { throw err })
			)
			.map(this.apiMessageService.handleMessage)
	}

	/**
	 * Function requesting a specific experiment. Take the requested experiment
	 * ID as a parameter.
	 * @param  experimentID The id of the experiment requested.
	 * @return              Return an observable to subscribe to.
	 */
	getExperiment (experimentID: string) {
		return this.http.get(appConfig.apiUrl + '/experiment/' + experimentID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				catchError(err => { throw err })
			)
			.map(this.apiMessageService.handleMessage)
	}
}
