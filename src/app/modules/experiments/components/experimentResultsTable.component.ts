import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core'
import { MatPaginator, MatTableDataSource } from '@angular/material'

@Component({
	selector: 'experiment-results-table',
	templateUrl: 'experimentResultsTable.component.html',
	styleUrls: ['./experimentResultsTable.component.scss']
})
export class ExperimentResultsTableComponent implements OnInit, AfterViewInit {
	@Input() stream: any

	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

	displayedColumns = []

	@ViewChild(MatPaginator) paginator: MatPaginator

	ngOnInit() {
		this.stream.subscribe(
			data => {
				if (data) {
					let results = data.toTable()
					this.dataSource.data = results.data
					this.displayedColumns = results.headers
				}
			}
		)
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}
}
