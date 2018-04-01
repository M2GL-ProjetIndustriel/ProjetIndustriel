import { Component, Input, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'

import { ResultMeasurements } from '../experimentResults.model'
import { ExperimentResultsGraphDialogComponent } from './experimentResultsGraphDialog.component'

@Component({
	selector: 'experiment-results-stats',
	templateUrl: 'experimentResultsStats.component.html',
	styleUrls: ['./experimentResultsStats.component.scss']
})
export class ExperimentResultsStatsComponent {
	@Input() stream

	@ViewChild('experimentResults') experimentResults

	graphData: any = null

	graphType: string = ''

	constructor(private dialog: MatDialog) {}

	onCreateGraph() {
		let dialogRef = this.dialog.open(ExperimentResultsGraphDialogComponent, {
			data: { headers: this.experimentResults.headers }
		})

		dialogRef.afterClosed().subscribe(
			result => {
				if (result)
					this.createGraph(result)
			}
		)
	}

	createGraph(params: any) {
		let data = (params.results === 'selected') ? this.experimentResults.selection.selected : this.experimentResults.dataSource.data

		this.graphData = null

		if (params.graph === 'pie') {
			this.graphType = params.graph
			this.graphData = this.toPieGraphDataset(data, params.header)
		}

	}

	toPieGraphDataset(data: ResultMeasurements[], header: string) {
		let graphData = this.emptyGraphData()

		for (let i in data) {
			graphData.labels.push(data[i].get('instance'))
			graphData.datasets[0].data.push(data[i].get(header))
		}

		return graphData
	}

	private emptyGraphData() {
		return {
			datasets: [{
				data: []
			}],
			labels: []
		}
	}
}
