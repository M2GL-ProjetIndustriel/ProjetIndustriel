import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'

import { Chart } from 'chart.js'

import { saveAs } from 'file-saver/FileSaver'

@Component({
	selector: 'app-test-graph',
	templateUrl: './testGraph.component.html',
	styleUrls: ['./testGraph.component.scss']
})
export class TestGraphComponent implements AfterViewInit {

	@ViewChild('chartCanvas') canvas: ElementRef

	chart: any

	constructor (private elementRef: ElementRef) { }

	ngAfterViewInit() {
		this.chart = new Chart(this.canvas.nativeElement, {
			type: 'line',
			data: {
				labels: ['test1', 'test2', 'test3'],
				datasets: [
					{
						data: [2, 1, 2],
						borderColor: '#FF0000',
						fill: false
					},
					{
						data: [1, 2, 1],
						borderColor: '#0000FF',
						fill: false
					}
				]
			},
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						display: true
					}],
					yAxes: [{
						display: true
					}]
				}
			}
		})
	}

	exportToImageAndSave() {
		this.canvas.nativeElement.toBlob((blob) => saveAs(blob, 'graph.png'))
	}
}
