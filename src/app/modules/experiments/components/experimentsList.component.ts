import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

import { Experiment } from '../experiment'
import { ExperimentService } from '../experiment.service'

@Component({
	selector: 'experiments-list',
	templateUrl: './experimentsList.component.html',
	styleUrls: ['./experimentsList.component.css']
})
export class ExperimentsListComponent implements AfterViewInit, OnDestroy {
	//Columns displayed in the template
	displayedColumns: string[] = ['id', 'name', 'date']
	//Data source of the table
	dataSource: MatTableDataSource<Experiment> = new MatTableDataSource<Experiment>([])

	isLoadingResults: boolean = true
	//All the subcriptions of the component
	subscriptions = []

	@ViewChild(MatPaginator) paginator: MatPaginator
	@ViewChild(MatSort) sort: MatSort

	constructor (private experimentService: ExperimentService) {
		this.refreshData()
	}

	ngAfterViewInit() {
		//if change sort reset back to page 1
		this.subscriptions.push(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0))

		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.sort
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((value) => {
			value.unsubscribe()
		})
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim()
		filterValue = filterValue.toLowerCase()
		this.dataSource.filter = filterValue
	}

	refreshData() {
		this.isLoadingResults = true

		setTimeout(() => {
			this.experimentService.getExperiments().subscribe(
				data =>	{
					this.dataSource.data = data
					this.isLoadingResults = false
				},
				err => {
					this.isLoadingResults = false
				}
			)
		}, 2000)

		/*this.experimentService.getExperiments().subscribe(
			data =>	{
				this.dataSource.data = data
				this.isLoadingResults = false
			},
			err => {
				console.log(err)
				this.isLoadingResults = false
			}
		)*/
	}

	onRowClicked() {
		console.log(1)
	}
}
