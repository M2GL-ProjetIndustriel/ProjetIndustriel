import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core'
import { MatPaginator, MatTableDataSource, MatSelect } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'

import { ExperimentResults } from '../experimentResults.model'

@Component({
	selector: 'experiment-results',
	templateUrl: 'experimentResults.component.html',
	styleUrls: ['./experimentResults.component.scss']
})
export class ExperimentResultsComponent implements OnInit, AfterViewInit {
	@Input() stream: any

	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

	displayedColumns = ['instance', 'select']

	@ViewChild(MatPaginator) paginator: MatPaginator

	selection: SelectionModel<any> = new SelectionModel<any>(true, [])

	headers: Array<string> = []

	ngOnInit() {
		if (this.stream && this.stream instanceof ExperimentResults)
			console.log('array')
		else if (this.stream)
			this.stream.subscribe(
				data => {
					if (data) {
						let results = data.toTable()
						this.dataSource.data = results.data
						this.headers = results.headers
					}
				})
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}
}
