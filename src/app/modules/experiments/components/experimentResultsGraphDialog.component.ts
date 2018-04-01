import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
	selector: 'experiment-results-graph-dialog',
	templateUrl: 'experimentResultsGraphDialog.component.html',
	styleUrls: ['./experimentResultsGraphDialog.component.scss']
})
export class ExperimentResultsGraphDialogComponent {
	headers: any

	selectedResults: string

	selectedHeader: string

	selectedGraphType: string

	constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
		if (data && data.headers)
			this.headers = data.headers
	}

	selectedValues() {
		return {
			results: this.selectedResults,
			header: this.selectedHeader,
			graph: this.selectedGraphType
		}
	}
}
