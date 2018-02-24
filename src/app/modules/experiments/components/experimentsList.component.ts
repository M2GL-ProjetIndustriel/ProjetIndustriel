import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

import { Experiment } from '../experiment'
import { ExperimentService } from '../experiment.service'
import { ErrorService } from '../../../shared/error.service'

/**
 * Component displaying a table containing experiments inside a
 * {@link CardComponent} component.
 *
 * Use angular material table component. See angular material table
 * documentation for more informations.
 */
@Component({
	selector: 'experiments-list',
	templateUrl: './experimentsList.component.html',
	styleUrls: ['./experimentsList.component.css']
})
export class ExperimentsListComponent implements AfterViewInit, OnDestroy {
	/**
	 * Columns to be displayed in the template.
	 */
	displayedColumns: string[] = ['id', 'name', 'date']
	/**
	 * Data source of the table.
	 */
	dataSource: MatTableDataSource<Experiment> = new MatTableDataSource<Experiment>([])
	/**
	 * Boolean describing wether or not the component is loading results.
	 */
	isLoadingResults: boolean = true
	/**
	 * All the subcriptions of the component.
	 */
	subscriptions = []
	/**
	 * Paginator of the table.
	 */
	@ViewChild(MatPaginator) paginator: MatPaginator
	/**
	 * Sorting thingy of the table.
	 */
	@ViewChild(MatSort) sort: MatSort

	/**
	 * Constructor of the component, doesn't do shit.
	 * @param experimentService Experiment service injection.
	 */
	constructor (private experimentService: ExperimentService, private errorService: ErrorService) { }

	/**
	 * Initialize everything the component need to be good to go.
	 *
	 * See angular comopnent lifecycle hooks for more informations.
	 */
	ngAfterViewInit() {
		//If change sort reset back to page 1.
		this.subscriptions.push(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0))

		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.sort

		//Populate the table by requesting data from the backend on init.
		this.refreshData()
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((value) => {
			value.unsubscribe()
		})
	}

	/**
	 * Function setting the value of the table filter.
	 * The value is trimed and set to lower case before applying the filter.
	 * @param filterValue Value  of the filter.
	 */
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim()
		filterValue = filterValue.toLowerCase()
		this.dataSource.filter = filterValue
	}

	/**
	 * Function refreshing the data of the table. Request data from the
	 * backend asynchronously. Need to subscribe each time because angular
	 * automatically unsubscribe from the http requests.
	 */
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
					this.errorService.newError(err)
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

	/**
	 * Function handling the click event of the rows of the table.
	 */
	onRowClicked() {
		console.log(1)
	}
}
