import { Component, ViewChild, AfterViewInit, OnDestroy, EventEmitter, OnInit } from '@angular/core'
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
	styleUrls: ['./solversList.component.scss']
})
export class SolversListComponent implements OnInit {
	tableColumns = [
		{
			columnKey: 'id',
			columnHeader: 'ID'
		},
		{
			columnKey: 'name',
			columnHeader: 'Nom'
		},
		{
			columnKey: 'created',
			columnHeader: 'Date d\'ajout'
		},
		{
			columnKey: 'modified',
			columnHeader: 'Date de modification'
		}
	]
	tableLink = {
		routerLink: '/solver/',
		tableColumnKey: 'id'
	}

	@ViewChild('table') table: any

	ngOnInit() {
		//this.table.setUpTable(this.tableColumns, this.tableLink)

		//this.table.setUpTableEvent(this.solverService.getSolvers)
	}
}
