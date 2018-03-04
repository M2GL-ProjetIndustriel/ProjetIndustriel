import { Component, ViewChild, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core'
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
	styleUrls: ['./experimentsList.component.scss']
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
	 * Subscription to the table events.
	 */
	dataSubscription: any
	/**
	 * Paginator of the table.
	 */
	@ViewChild(MatPaginator) paginator: MatPaginator
	/**
	 * Sorting thingy of the table.
	 */
	@ViewChild(MatSort) sort: MatSort
	/**
	 * Event emitter that represent the need to refresh the data of the table.
	 */
	refresh: EventEmitter<any> = new EventEmitter()

	/**
	 * Constructor of the component, doesn't do shit.
	 * @param experimentService Experiment service injection.
	 */
	constructor(private experimentService: ExperimentService) {}

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

		this.setUpTableEvent()
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe()
		})
		if (this.dataSubscription)
			this.dataSubscription.unsubscribe()
	}

	/**
	 * Set up the table event, subscribe to the sort change and page observable,
	 * so whenever the sort or the page change data is requested to the
	 * backend to update the table.
	 */
	setUpTableEvent() {
		this.dataSubscription = merge(this.sort.sortChange, this.paginator.page, this.refresh)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true
					return this.experimentService.getExperiments(
						this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
						(this.sort.direction === '') ? this.sort.start : this.sort.direction)
				}),
				map(data => {
					this.isLoadingResults = false
					this.resultsLength = data.totalLength
					return data.experiments
				})
			).subscribe(
				data =>	this.dataSource.data = data,
				err => {
					this.isLoadingResults = false
					throw err
				})
	}

	/**
	 * Function refreshing table data.
	 * When an error occurs the subscription is closed/stopped so we need to
	 * re-subscribe in order to get data.
	 * If there was no error and the subscription is still active will just emit
	 * a worthless event to force update.
	 */
	refreshEvent() {
		if (this.dataSubscription.closed || this.dataSubscription.isStopped)
			this.setUpTableEvent()
		else
			this.refresh.emit(null)
	}
}
