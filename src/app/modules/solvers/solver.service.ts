import { Injectable } from '@angular/core'
import {
	HttpClient,
	HttpParams,
	HttpHeaders,
	HttpRequest,
	HttpEvent,
	HttpEventType,
	HttpResponse
} from '@angular/common/http'

import { catchError, retry, map, tap, last } from 'rxjs/operators'

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
		params = params.append('page_size', (pageSize) ? pageSize.toString() : '')
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

	postSolver(data: FormData, progressHandler?: (message: any, ctx?: any) => void, ctx?: any) {
		const req = this.createFormDataRequest('POST', appConfig.apiUrl + '/solver/', data)

		return this.requestWithProgress(req, progressHandler, ctx)
	}

	editSolver(data: FormData, solverID: string, progressHandler?: (message: any, ctx?: any) => void, ctx?: any) {
		const req = this.createFormDataRequest('PUT', appConfig.apiUrl + '/solver/' + solverID, data)

		return this.requestWithProgress(req, progressHandler, ctx)
	}

	deleteSolver(solverID: string) {
		return this.http.delete(appConfig.apiUrl + '/solver/' + solverID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	getSolverFile(url: string, progressHandler?: (message: any, ctx?: any) => void, ctx?: any) {
		const req = new HttpRequest('GET', url, {
			reportProgress: true,
			responseType: 'blob'
		})

		return this.http.request(req)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(event => this.getEventMessage(event)),
				tap((msg) => {
					if (progressHandler)
						progressHandler(msg, ctx)
				}),
				last(),
			)
	}

	private createFormDataRequest(method: string, url: string, data: FormData): HttpRequest<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data'
			}),
			reportProgress: true
		}

		return new HttpRequest(method, url, data, httpOptions)
	}

	private requestWithProgress(req: HttpRequest<any>, progressHandler?: (message: any, ctx?: any) => void, ctx?: any) {
		return this.http.request(req)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(event => this.getEventMessage(event)),
				tap((msg) => {
					if (progressHandler)
						progressHandler(msg, ctx)
				}),
				last(),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	private getEventMessage(event: HttpEvent<any>) {
		switch(event.type) {
			case HttpEventType.Sent:
				return 'Upload start'
			case HttpEventType.UploadProgress:
				return Math.round(100 * event.loaded / event.total)
			case HttpEventType.DownloadProgress:
				return Math.round(100 * event.loaded / event.total)
			case HttpEventType.Response:
				return event.body
			default:
				return 'Some event: ' + event.type
		}
	}
}
