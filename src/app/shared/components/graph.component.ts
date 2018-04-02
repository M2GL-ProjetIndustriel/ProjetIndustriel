import { Component, Input, ElementRef, ViewChild } from '@angular/core'

import { Chart } from 'chart.js'

import { saveAs } from 'file-saver/FileSaver'

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.scss']
})
export class GraphComponent  {

	@Input() set graphType(value: string) {
		this.createChart(this._data, value, this._option)
	}

	private _graphType: string = 'pie'

	@Input() set data(value: any) {
		this.createChart(value, this._graphType, this._option)
	}

	private _data: any = null

	@Input() set option(value: any) {
		this.createChart(this._data, this._graphType, value)
	}

	private _option: any = []

	@ViewChild('chartCanvas') canvas: ElementRef

	chart: any

	constructor (private elementRef: ElementRef) {}

	exportToImageAndSave() {
		this.canvas.nativeElement.toBlob((blob) => saveAs(blob, 'graph.png'))
	}

	createChart(data, type, option) {
		if (this._graphType !== type || this._data !== data || this._option !== option) {
			this._graphType = type
			this._data = data
			this._option = option

			if (this.chart)
				this.chart.destroy()

			this.chart = new Chart(this.canvas.nativeElement, {
				type: this._graphType,
				data: this._data,
				options: {
					legend: {
						display: this._option[0] || false
					},
					scales: {
						xAxes: [{
							display: this._option[1] || false
						}],
						yAxes: [{
							display: this._option[1] || false
						}]
					}
				}
			})
		}
	}
}
