import { Component, ViewChild, OnInit } from '@angular/core'

@Component({
	selector: 'solvers-list',
	templateUrl: './solversList.component.html',
	styleUrls: ['./solversList.component.scss']
})
export class SolversListComponent implements OnInit {
	tableColumns = [
		{ columnKey: 'id', columnHeader: 'ID' },
		{ columnKey: 'name', columnHeader: 'Nom' },
		{ columnKey: 'created',	columnHeader: 'Date d\'ajout' },
		{ columnKey: 'modified', columnHeader: 'Date de modification' }
	]

	tableLink = {
		routerLink: '/solver/',
		tableColumnKey: 'id'
	}

	@ViewChild('table') table: any

	ngOnInit() {
		this.table.setUpTable(this.tableColumns, this.tableLink)
	}

	refreshEvent() {
		this.table.refreshEvent()
	}
}
