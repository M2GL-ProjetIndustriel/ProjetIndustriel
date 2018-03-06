import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http'

import { catchError, retry, map } from 'rxjs/operators'

import { ApiMessageService } from '../../shared/apiMessage.service'
import { appConfig } from '../../config'

/**
 * Solver service, handle the http request to the backend to retrieve
 * solvers data.
 *
 * If a request fails will try up to 3 more time for a total of 4 tries,
 * if the 4 tries fails will throw an error.
 *
 * The number of retry is configurable in the config file ({@link appConfig}).
 */
@Injectable()
export class SolverService {

	/**
	 * Constructor, doesn't do shit.
	 * @param http HttpClient injection.
	 */
	constructor (
		private http: HttpClient,
		private apiMessageService: ApiMessageService
	) {}

	/**
	 * Function requesting a list of solvers. Take apge number a and a
	 * page size as parameters, if none of them are present the request
	 * should return evry single solvers otherwise should return the
	 * solvers of the corresponding page.
	 * @param  pageIndex Number of the page requested.
	 * @param  pageSize  Size of a page.
	 * @param  sort      Sorting preference of the request.
	 * @param  order     Sorting order (asc or desc).
	 * @return 			 Return an observable to subscribe to.
	 */
	getSolvers(pageIndex?: number, pageSize?: number, sort?: string, order?: string) {
		let params = new HttpParams()
		params = params.append('pageIndex', (pageIndex) ? pageIndex.toString() : '')
		params = params.append('pageSize', (pageSize) ? pageSize.toString() : '')
		params = params.append('sort', (sort) ? sort : '')
		params = params.append('order', (order) ? order : '')

		return this.http.get(appConfig.apiUrl + '/solver', {
			params: params
		}).pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Function requesting a specific solver. Take the requested solver
	 * ID as a parameter.
	 * @param  solverID The id of the solver requested.
	 * @return              Return an observable to subscribe to.
	 */
	getSolver(solverID: string) {
		return this.http.get(appConfig.apiUrl + '/solver/' + solverID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	postSolver(data: FormData) {
		const httpOptions = {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data'
			})
		}
		return this.http.post(appConfig.apiUrl + '/solver/', data, httpOptions)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	editSolver(data: FormData, solverID: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data'
			})
		}
		return this.http.put(appConfig.apiUrl + '/solver/' + solverID, data, httpOptions)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	getSolverFile(url: string) {
		return this.http.get(url, { responseType: 'blob' })
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				catchError(err => { throw err })
			)
	}

	deleteSolver(solverID: string) {
		return this.http.delete(appConfig.apiUrl + '/solver/' + solverID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}
}
