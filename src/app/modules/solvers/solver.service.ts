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
	 * @param http              HttpClient injection.
	 * @param apiMessageService ApiMessageService injection.
	 */
	constructor (
		private http: HttpClient,
		private apiMessageService: ApiMessageService
	) {}

	/**
	 * Function requesting a list of solvers. Take a page number and a
	 * page size as parameters for pagination, and a sort colomn and a sort
	 * order (asc or desc) for sorting purpose should return the solvers of the
	 * corresponding page sorted in the requested order.
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

		return this.http.get(appConfig.apiUrl + '/solver', { params: params }).pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err }))
	}

	/**
	 * Function requesting a specific solver. Take the requested solver
	 * ID as a parameter.
	 * @param  solverID Id of the solver requested.
	 * @return          Return an observable to subscribe to.
	 */
	getSolver(solverID: string) {
		return this.http.get(appConfig.apiUrl + '/solver/' + solverID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Post the FormData to create a new solver. Since the solver might need to
	 * upload files the request is reporting progress to keep an eye on the
	 * progress of the upload. The function can be given a function
	 * called each time progress is reported.
	 * @param  data            Data to post.
	 * @param  progressHandler Function handling the event messages on progress update.
	 * @return                 Return an observable to subscribe to.
	 */
	postSolver(data: FormData, progressHandler?: (message: any, ctx?: any) => void) {
		const req = this.createFormDataRequest('POST', appConfig.apiUrl + '/solver', data)

		return this.requestWithProgress(req, progressHandler)
	}

	/**
	 * Put the FormData to update an existing solver. Since the solver might
	 * need to upload files the request is reporting progress to keep an eye
	 * on the progress of the upload. The function can be given a function
	 * called each time progress is reported.
	 * @param  data            Data to update.
	 * @param  solverID        Id of the solver to update.
	 * @param  progressHandler Function handling the event messages on progress update
	 * @return                 Return an observable to subscribe to.
	 */
	editSolver(data: FormData, solverID: string, progressHandler?: (message: any, ctx?: any) => void) {
		const req = this.createFormDataRequest('PUT', appConfig.apiUrl + '/solver/' + solverID, data)

		return this.requestWithProgress(req, progressHandler)
	}

	/**
	 * Request a solver to be deleted.
	 * @param  solverID Id of the solver to be deleted.
	 * @return          Return an observable to subscribe to.
	 */
	deleteSolver(solverID: string) {
		return this.http.delete(appConfig.apiUrl + '/solver/' + solverID)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Download the files of a solver (source files and executable). Since it's
	 * a download the request is reporting progress to keep an eye on the
	 * progress of the download. The function can be given a function called
	 * each time progress is reported.
	 * @param  url             Location of the file to download.
	 * @param  progressHandler Function handling the event messages on progress update.
	 * @return                 Return an observable to subscribe to.
	 */
	getSolverFile(url: string, progressHandler?: (message: any, ctx?: any) => void) {
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
						progressHandler(msg)
				}),
				last(),
			)
	}

	/**
	 * Create a multipart/form-data request that report progress.
	 * @param  method Http method of the request (GET, POST, ...)
	 * @param  url    Url of the request.
	 * @param  data   FormData of the request.
	 * @return        Return an HttpRequest.
	 */
	private createFormDataRequest(method: string, url: string, data: FormData): HttpRequest<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data'
			}),
			reportProgress: true
		}

		return new HttpRequest(method, url, data, httpOptions)
	}

	/**
	 * Handle a request with progress, each time progress is reported, the
	 * progressHandler function is called and will only return the last progress
	 * message which is the HttpResponse.
	 * @param  req             An Http request who report progress.
	 * @param  progressHandler Function handling the event messages on progress update.
	 * @return                 Return an observable to subscribe to.
	 */
	private requestWithProgress(req: HttpRequest<any>, progressHandler?: (message: any, ctx?: any) => void) {
		return this.http.request(req)
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map(event => this.getEventMessage(event)),
				tap((msg) => {
					if (progressHandler)
						progressHandler(msg)
				}),
				last(),
				map(this.apiMessageService.handleMessage),
				catchError(err => { throw err })
			)
	}

	/**
	 * Function handling the events in a request who report progres, the only
	 * event type supported are UploadProgress, DownloadProgress who will
	 * return the percentage of the upload or download. The event type Response
	 * will return the HttpResponse.
	 *
	 * Can be subject to change if the handling of other event type become
	 * necessary.
	 * @param  event An Http event.
	 * @return       Return a number or an HttpResponse.
	 */
	private getEventMessage(event: HttpEvent<any>) {
		switch(event.type) {
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
