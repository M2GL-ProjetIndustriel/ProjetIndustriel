import { Component, ViewChild, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

import { merge } from 'rxjs/observable/merge'
import { map } from 'rxjs/operators/map'
import { startWith } from 'rxjs/operators/startWith'
import { switchMap } from 'rxjs/operators/switchMap'

import { Solver } from '../solver.model'
import { SolverService } from '../solver.service'

/**
 * Component displaying a table containing solvers inside a
 * {@link CardComponent} component.
 *
 * Use angular material table component. See angular material table
 * documentation for more informations.
 */
@Component({
	selector: 'solvers-list',
	templateUrl: './solversList.component.html',
	styleUrls: ['./solversList.component.css']
})
export class SolversListComponent implements AfterViewInit, OnDestroy {
	/**
	 * Columns to be displayed in the template.
	 */
	displayedColumns: string[] = ['id', 'name', 'date']
	/**
	 * Data source of the table.
	 */
	dataSource: MatTableDataSource<Solver> = new MatTableDataSource<Solver>([])
	/**
	 * Boolean describing wether or not the component is loading results.
	 */
	isLoadingResults: boolean = true
	/**
	 * Total length of the response, the total number of solvers.
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
	 * @param solverService Solver service injection.
	 */
	constructor(private solverService: SolverService) {}

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
					return this.solverService.getSolvers(
						this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
						(this.sort.direction === '') ? this.sort.start : this.sort.direction)
				}),
				map(data => {
					this.isLoadingResults = false
					this.resultsLength = data.totalLength

					return data.solvers
				})
			).subscribe(
				data => this.dataSource.data = data,
				err => {
					this.isLoadingResults = false
					throw err
			 	}
			)
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
