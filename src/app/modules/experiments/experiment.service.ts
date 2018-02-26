import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { catchError, retry } from 'rxjs/operators'

import { BasicExperiment, Experiment } from './experiment'

import { appConfig } from '../../config'

@Injectable()
export class ExperimentService {

	constructor (private http: HttpClient) {}

	getExperiments () {
		return this.http.get(appConfig.apiUrl + '/experiment')
			.pipe(
				retry(3),
				catchError(err => { throw err })
			)
	}

	getExperiment (experimentID: string) {
		return this.http.get(appConfig.apiUrl + '/experiment/' + experimentID)
			.pipe(
				retry(3),
				catchError(err => { throw err })
			)
	}

}
