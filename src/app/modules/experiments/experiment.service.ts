import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map'

import { BasicExperiment, Experiment } from './experiment'

@Injectable()
export class ExperimentService {
	constructor (private http: HttpClient) {}

	static extractData (res: Response) {
		const tmp: BasicExperiment[] = []
		for (const i of Object.keys(res)) {
			tmp.push(res[i])
		}
		return tmp
	}

	getExperiments () {
		return this.http.get('http://localhost:3000/api/experiment')
			.map(ExperimentService.extractData)
	}

	getExperiment (experimentID: string) {
		return this.http.get('http://localhost:3000/api/experiment/' + experimentID)
			.map(ExperimentService.extractData)
	}
}
