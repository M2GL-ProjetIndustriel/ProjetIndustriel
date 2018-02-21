import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/catch'

import { Experiment } from './experiment'

@Injectable()
export class ExperimentService {
	constructor (private http: HttpClient) { }

	static extractData (res: Response) {
		const tmp: Experiment[] = []
		for (const i of Object.keys(res)) {
			tmp.push(res[i])
		}
		return tmp
	}

	getExperiments () {
		return this.http.get('http://localhost:3000/api/experiment')
			.map(ExperimentService.extractData)
	}
}
