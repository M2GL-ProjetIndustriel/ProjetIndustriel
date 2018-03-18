import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core'
import { MatPaginator, MatTableDataSource } from '@angular/material'

@Component({
	selector: 'instance-features-table',
	templateUrl: 'instanceFeaturesTable.component.html',
	styleUrls: ['./instanceFeaturesTable.component.scss'],
})
export class InstanceFeaturesTableComponent implements OnInit, AfterViewInit {
	@Input() stream: any

	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

	displayedColumns = []

	@ViewChild(MatPaginator) paginator: MatPaginator

	ngOnInit() {
		this.stream.subscribe(
			data => {
				if (data) {
					this.dataSource.data = this.convertData(data.headers, data.data)
					this.displayedColumns = data.headers
				}
			}
		)
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

	private convertData(headers, data) {
		let result = []
		for (let i in data) {
			result[i] = {}
			for (let j in data[i]) {
				//normalize strings
				if (!headers[j]) //for testing remove later
					headers[j] = j
				else
					headers[j] = headers[j].replace(/ /g, '').toLowerCase()
				result[i][headers[j]] = data[i][j].replace(/ /g, '').toLowerCase()
			}
		}
		return result
	}
}
