import { Component, ViewChild, AfterViewInit, OnDestroy, EventEmitter, Input, OnInit, Injector } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { map } from 'rxjs/operators/map'
import { startWith } from 'rxjs/operators/startWith'
import { switchMap } from 'rxjs/operators/switchMap'

//TODO: find an alternative
/**
 * Table component, dynamic table with pagination, assume the data is provided
 * by a service and a http request.
 *
 * Take a service name and a function name
 * as input, the columns and routing are set up by calling the setUpTable
 * function.
 *
 * Use angular material table component. See angular material table
 * documentation for more informations.
 */
@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnDestroy, OnInit {
	/**
	 * Columns of the table.
	 */
	tableColumns: TableColumn[] = []
	 /**
 	 * Columns to be displayed in the template.
 	 */
	displayedColumns: string[] = []
	/**
	 * Routing of the table. By default there's no routing.
	 */
	tableRouterLink: TableRouterLink = null
	/**
	 * Name of the service to inject.
	 */
	@Input() serviceName: string
	/**
	 * Name of the service function to call.
	 */
	@Input() dataStreamName: string
	/**
	 * Reference to the service.
	 */
	service: any
	/**
	 * Whether or not the table has been set up.
	 */
	isTableSetUp: boolean = false

	/**
	 * Data source of the table.
	 */
	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])
	/**
	 * Boolean describing wether or not the component is loading results.
	 */
	isLoadingResults: boolean = true
	/**
	 * Total number of elements, for pagination purpose.
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

	constructor(private injector: Injector) {}

	/**
	 * On init inject the service.
	 */
	ngOnInit() {
		this.service = this.injector.get(this.serviceName)
	}

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
	 * Setup the table and set the isTableSetUp flag to true.
	 */
	setUpTable(tableColumns: TableColumn[], tableRouterLink?: TableRouterLink) {
		this.tableColumns = tableColumns
		this.displayedColumns = this.tableColumns.map(x => x.columnKey)

		if (tableRouterLink)
			this.tableRouterLink = tableRouterLink

		this.isTableSetUp = true
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
					return this.service[this.dataStreamName](
						this.paginator.pageIndex,
						this.paginator.pageSize,
						this.sort.active,
						(this.sort.direction === '') ? this.sort.start : this.sort.direction)
				}),
				map((data: any) => {
					this.isLoadingResults = false

					this.resultsLength = data.count

					return data.results
				})
			).subscribe(
				data => this.dataSource.data = data,
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

/**
 * A table column is defined by a key and a header name.
 */
export interface TableColumn {
	columnKey: string
	columnHeader: string
}

/**
 * The routing of the table is defined by a string refresenting the route and
 * column key for the data to pass to the route (optional).
 */
export interface TableRouterLink {
	routerLink: string
	tableColumnKey: string
}
