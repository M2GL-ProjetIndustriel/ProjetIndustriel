import { Component, ViewChild, OnInit } from '@angular/core'

import { TableComponent } from '../../../shared/components/table.component'

/**
 * Experiments list component, use {@link TableComponent} to display a list of
 * experiments.
 */
@Component({
	selector: 'experiments-list',
	templateUrl: './experimentsList.component.html',
	styleUrls: ['./experimentsList.component.scss']
})
export class ExperimentsListComponent implements OnInit {
	/**
	 * Array of column header, each column header has a key and a name.
	 */
	tableColumns = [
		{ columnKey: 'name', columnHeader: 'Nom' },
		{ columnKey: 'date', columnHeader: 'Date' },
	]
	/**
	 * Routing of the table, each row of the table will redirect to an experiment.
	 */
	tableLink = {
		routerLink: '/experiment/',
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
