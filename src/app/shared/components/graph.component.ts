import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core'

import { Chart } from 'chart.js'

import { saveAs } from 'file-saver/FileSaver'

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements AfterViewInit {

	@Input() set graphType(value: string) {
		this.createChart(this.data, value)
	}

	private _graphType: string = 'pie'

	@Input() set data(value: any) {
		this.createChart(value, this.graphType)
	}

	private _data: any = null

	@ViewChild('chartCanvas') canvas: ElementRef

	chart: any

	constructor (private elementRef: ElementRef) { }

	ngAfterViewInit() {
		this.createChart(this.data, this.graphType)
	}

	exportToImageAndSave() {
		this.canvas.nativeElement.toBlob((blob) => saveAs(blob, 'graph.png'))
	}

	createChart(data, type) {
		if (this._graphType !== type || this._data !== data) {
			if (type)
				this._graphType = type
			if (data)
				this._data = data

			if (this.chart)
				this.chart.destroy()
			this.chart = new Chart(this.canvas.nativeElement, {
				type: this._graphType,
				data: this._data,
				options: {
					legend: {
						display: false
					}/*,
					scales: {
						xAxes: [{
							display: true
						}],
						yAxes: [{
							display: true
						}]
					}*/
				}
			})
			console.log(this.chart)
		}

	}
}
