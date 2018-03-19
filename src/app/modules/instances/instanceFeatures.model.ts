export class InstanceFeature {
	name: string
	value: string
	unit: string

	constructor(name: string, value: string, unit?: string) {
		this.name = name.replace(/ /g, '').toLowerCase()
		this.value = value.replace(/ /g, '').toLowerCase()
		this.unit = (unit) ? unit.replace(/ /g, '').toLowerCase() : ''
	}
}

export class InstanceFeatures {
	private data: Array<InstanceFeature> = new Array<InstanceFeature>()

	add(name: string, value: string, unit?: string) {
		this.data.push(new InstanceFeature(name, value, unit))
	}

	toArray(): Array<InstanceFeature> {
		return this.data
	}
}

export class InstanceFeaturesFactory {

	static newFromCSV(csvData: Array<any>): InstanceFeatures {
		//first row is the columns headers row
		const headers = csvData.slice(0, 1)[0]
		const data = csvData.slice(1)

		if (!InstanceFeaturesFactory.isValidCSV(headers))
			return null

		let result = new InstanceFeatures()
		for (let i in data) {
			result.add(data[i][0], data[i][1], data[i][2])
		}
		return result
	}

	static toTableFormatFromCSV(csvData: Array<any>) {
		let features = InstanceFeaturesFactory.newFromCSV(csvData)

		if (!features)
			return null

		return InstanceFeaturesFactory.toTableFormatFromFeatures(features)
	}

	static toTableFormatFromFeatures(features: InstanceFeatures) {
		return {
			data: features.toArray(),
			headers: ['name', 'value', 'unit']
		}
	}

	static toBackendFormatFromFeatures(features: InstanceFeatures): Array<any> {
		const data = features.toArray()
		let result = []

		for (let i in data) {
			result[i] = {}
			for (let j in data[i]) {
				result[i].value = data[i].value
				result[i].feature = {
					'name': data[i].name,
					'unit': data[i].unit
				}
			}
		}
		return result
	}

	private static isValidCSV(headers: Array<any>): boolean {
		headers = InstanceFeaturesFactory.normalizeHeaders(headers)

		if (headers.length !== 3)
			return false
		if (headers[0] !== 'name' || headers[1] !== 'value' || headers[2] !== 'unit')
			return false

		return true
	}

	private static normalizeHeaders(headers: Array<any>): Array<any> {
		for (let i in headers)
			headers[i] = headers[i].replace(/ /g, '').toLowerCase()

		return headers
	}
}
