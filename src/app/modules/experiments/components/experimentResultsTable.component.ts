import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core'
import { MatPaginator, MatTableDataSource, MatSelect } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'

@Component({
	selector: 'experiment-results-table',
	templateUrl: 'experimentResultsTable.component.html',
	styleUrls: ['./experimentResultsTable.component.scss']
})
export class ExperimentResultsTableComponent implements OnInit, AfterViewInit {
	@Input() stream: any

	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

	displayedColumns = ['instance', 'select']

	@ViewChild(MatPaginator) paginator: MatPaginator

	selection: SelectionModel<any> = new SelectionModel<any>(true, [])

	ngOnInit() {
		this.stream.subscribe(
			data => {
				if (data) {
					let results = data.toTable()
					this.dataSource.data = results.data
				}
			})

		this.selection.onChange.subscribe(
			data => this.handleSelectionChange(data),
			err => { throw err })
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

	handleSelectionChange(data: any) {

	}
}
