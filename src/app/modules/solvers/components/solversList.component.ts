import { Component, ViewChild, OnInit } from '@angular/core'

import { TableComponent } from '../../../shared/components/table.component'

/**
 * Solvers list component, use {@link TableComponent} to display a list of
 * solvers.
 */
@Component({
	selector: 'solvers-list',
	templateUrl: './solversList.component.html',
	styleUrls: ['./solversList.component.scss']
})
export class SolversListComponent implements OnInit {
	/**
	 * Array of column header, each column header has a key and a name.
	 */
	tableColumns = [
		{ columnKey: 'name', columnHeader: 'Nom' },
		{ columnKey: 'created',	columnHeader: 'Date d\'ajout' },
		{ columnKey: 'modified', columnHeader: 'Date de modification' }
	]
	/**
	 * Routing of the table, each row of the table will redirect to a solver.
	 */
	tableLink = {
		routerLink: '/solver/',
		tableColumnKey: 'id'
	}
	/**
	 * TableComponent reference.
	 */
	@ViewChild('table') table: TableComponent

	/**
	 * On init setup the {@link TableComponent} using tableColumns and
	 * tableLink.
	 */
	ngOnInit() {
		this.table.setUpTable(this.tableColumns, this.tableLink)
	}

	/**
	 * Handler of the refresh button, refresh the table.
	 */
	refreshEvent() {
		this.table.refreshEvent()
	}
}
