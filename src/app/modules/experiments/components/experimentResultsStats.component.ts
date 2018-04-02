import { Component, Input, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material'

import { ResultMeasurements } from '../experimentResults.model'
import { ExperimentResultsGraphDialogComponent } from './experimentResultsGraphDialog.component'
import { ColorService } from '../../../shared/color.service'

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

	graphOption: boolean[] = []

	constructor(
		private dialog: MatDialog,
		private colors: ColorService
	) {}

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
		this.graphType = params.graph
		this.graphOption = [params.legend, params.axis]

		if (params.graph === 'line')
			this.graphData = this.toLineGraphDataset(data, params)
		if (params.graph === 'bar')
			this.graphData = this.toBarGraphDataset(data, params)
		if (params.graph === 'pie')
			this.graphData = this.toPieGraphDataset(data, params)

	}

	toPieGraphDataset(data: ResultMeasurements[], params: any) {
		let graphData = this.emptyGraphData()

		for (let i in data) {
			graphData.labels.push(data[i].get('instance'))
			graphData.datasets[0].data.push(data[i].get(params.header))
		}

		graphData.datasets[0].backgroundColor = this.setGraphColor(graphData)

		return graphData
	}

	toLineGraphDataset(data: ResultMeasurements[], params: any) {
		let graphData = this.emptyGraphData()

		for (let i in data) {
			graphData.labels.push(data[i].get('instance'))
			graphData.datasets[0].data.push(data[i].get(params.header))
		}

		graphData.datasets[0].borderColor = this.colors.getRandomColor()
		graphData.datasets[0]['fill'] = false
		graphData.datasets[0]['label'] = params.header

		return graphData
	}

	toBarGraphDataset(data: ResultMeasurements[], params: any) {
		let graphData = this.emptyGraphData()

		for (let i in data) {
			graphData.labels.push(data[i].get('instance'))
			graphData.datasets[0].data.push(data[i].get(params.header))
		}

		graphData.datasets[0].backgroundColor = this.setGraphColor(graphData)
		graphData.datasets[0]['label'] = params.header

		return graphData
	}

	private emptyGraphData() {
		return {
			datasets: [{
				data: [],
				backgroundColor: [],
				borderColor: ''
			}],
			labels: []
		}
	}

	private setGraphColor(data: any) {
		let colors = []

		for (let i = 0; i < data.datasets[0].data.length ; i++)
			colors.push(this.colors.getRandomColor())

		return colors
	}
}
