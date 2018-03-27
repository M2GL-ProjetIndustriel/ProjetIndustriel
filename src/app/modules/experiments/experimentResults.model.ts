export class ResultMeasurement {
	name: string
	value: string

	constructor(name: string, value: string) {
		this.name = name.replace(/ /g, '').toLowerCase()
		this.value = value.replace(/ /g, '').toLowerCase()
	}
}

export class ResultMeasurements {
	private data: Array<ResultMeasurement> = new Array<ResultMeasurement>()

	add(name: string, value: string) {
		this.data.push(new ResultMeasurement(name, value))
	}

	get(name: string) {
		for (let i in this.data) {
			if (this.data[i].name === name)
				return this.data[i].value
		}
		return null
	}

	toArray(): Array<ResultMeasurement> {
		return this.data
	}
}

export class ExperimentResults {
	private headers: Array<any> = null
	private results: Array<ResultMeasurements> = new Array<ResultMeasurements>()

	constructor(headers: Array<any>) {
		this.headers = headers
	}

	add(result: ResultMeasurements) {
		this.results.push(result)
	}

	toArray(): Array<ResultMeasurements> {
		return this.results
	}

	toTable() {
		return {
			headers: this.headers,
			data: this.results
		}
	}
}


export class ResultMeasurementsFactory {

	static newFromCSV(csvData: Array<any>): ExperimentResults {
		//first row is the columns header row
		const headers = csvData.slice(0, 1)[0]
		const data = csvData.slice(1)

		if (!ResultMeasurementsFactory.isValidCSV(headers))
			return null

		let result = new ExperimentResults(headers)
		for (let i in data) {
			let measurement = new ResultMeasurements()

			for (let j in data[i])
				measurement.add(headers[j] || '', data[i][j])

			result.add(measurement)
		}
		return result
	}

	private static isValidCSV(headers: Array<any>): boolean {
		headers = ResultMeasurementsFactory.normalizeHeaders(headers)

		if (headers.length < 2)
			return false
		if (headers[0] !== 'instance' || headers[1] !== 'status')
			return false

		return true
	}

	private static normalizeHeaders(headers: Array<any>): Array<any> {
		for (let i in headers)
			headers[i] = headers[i].replace(/ /g, '').toLowerCase()

		return headers
	}
}
