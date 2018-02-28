import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { of as observableOf } from 'rxjs/observable/of'
import { FileUploader } from 'ng2-file-upload'


@Component({
	selector: 'app-file-drop-zone',
	templateUrl: './fileDropZone.component.html',
	styleUrls: ['./fileDropZone.component.css'],
})
export class FileDropZoneComponent {
	@Input() label: string

	fileUploader: FileUploader = new FileUploader({ url: 'test'})

	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

	isFileOverDropZone: boolean = false

	displayedColumns = ['filename', 'size', 'progress', 'status', 'actions']

	fileOverDropZone (e: any): void {
		this.isFileOverDropZone = e
	}

	updateData () {
		this.dataSource.data = this.fileUploader.queue
	}
}
