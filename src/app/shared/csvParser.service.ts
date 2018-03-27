import { Injectable } from '@angular/core'

import { PapaParseService } from 'ngx-papaparse'

@Injectable()
export class CSVParserService {

	constructor(private papa: PapaParseService) {}

	parseCSVFile(csvFile: File, callback: Function) {
		if (!this.checkFileTypeIsCSV(csvFile))
			return

		let reader = new FileReader()
		reader.onloadend = () => {
			this.papa.parse(reader.result, {
				complete: (result) => {
					callback(result.data)
				}
			})
		}
		reader.readAsText(csvFile)
	}

	checkFileTypeIsCSV(file: File): boolean {
		/*if (Object.values(CSV_MIME_TYPE_Support).includes(file.type))
			return true
		return false*/
		return true
	}
}

enum CSV_MIME_TYPE_Support {
	TEXT_PLAIN = 'text/plain',
	TEXT_CSV = 'text/csv',
	TEXT_X_CSV = 'text/x-csv',
	APPLICATION_CSV = 'application/csv',
	APPLICATION_X_CSV = 'application/x-csv',
	APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel'
}
