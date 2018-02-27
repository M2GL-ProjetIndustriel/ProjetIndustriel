import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

import { merge } from 'rxjs/observable/merge'
import { map } from 'rxjs/operators/map'
import { startWith } from 'rxjs/operators/startWith'
import { switchMap } from 'rxjs/operators/switchMap'

import { BasicExperiment } from '../experiment'
import { ExperimentService } from '../experiment.service'

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
	dataSource: MatTableDataSource<BasicExperiment> = new MatTableDataSource<BasicExperiment>([])
	/**
	 * Boolean describing wether or not the component is loading results.
	 */
	isLoadingResults: boolean = true
	/**
	 * Total length of the response, the total number of experiments.
	 */
	resultsLength: number = 0
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
	constructor (private experimentService: ExperimentService) {}

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

		//Copy pasta of angular material exemple, go to https://material.angular.io/components/table/examples
		//for actual explanations.
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true
					return this.experimentService.getExperiments(
						this.paginator.pageIndex, this.paginator.pageSize, this.sort.active)
				}),
				map(data => {
					this.isLoadingResults = false
					this.resultsLength = data.totalLength

					return data.experiments
				})
			).subscribe(
				data => this.dataSource.data = data,
				err => { throw err })
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe()
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
	 * automatically unsubscribe from the http requests. Still add the
	 * subscription to the subcriptions array in case the component is
	 * destroyed during the request, in which case we can cancel the request.
	 */
	refreshData() {
		this.isLoadingResults = true

		this.subscriptions.push(this.experimentService.getExperiments().subscribe(
			data =>	{
				this.dataSource.data = data as BasicExperiment[]
				this.isLoadingResults = false
			},
			err => {
				this.isLoadingResults = false
				throw err
			}
		))
	}
}
