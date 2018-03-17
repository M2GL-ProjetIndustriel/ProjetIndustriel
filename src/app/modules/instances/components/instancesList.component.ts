import { Component, ViewChild, OnInit } from '@angular/core'

import { TableComponent } from '../../../shared/components/table.component'

/**
 * Instances list component, use {@link TableComponent} to display a list of
 * instances.
 */
@Component({
	selector: 'instances-list',
	templateUrl: './instancesList.component.html',
	styleUrls: ['./instancesList.component.scss']
})
export class InstancesListComponent implements OnInit {
	/**
	 * Array of column header, each column header has a key and a name.
	 */
	tableColumns = [
		{ columnKey: 'name', columnHeader: 'Nom' },
		{ columnKey: 'instance_type', columnHeader: 'Type' },
		{ columnKey: 'instance_family', columnHeader: 'Famille' }
	]
	/**
	 * Routing of the table, each row of the table will redirect to a instance.
	 */
	tableLink = {
		routerLink: '/instance/',
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
