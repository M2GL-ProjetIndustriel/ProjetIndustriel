import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { of as observableOf } from 'rxjs/observable/of'
import { FileUploader } from 'ng2-file-upload'


@Component({
	selector: 'app-file-upload',
	templateUrl: './fileUpload.component.html',
	styleUrls: ['./fileUpload.component.css'],
})
export class FileUploadComponent {
	@Input() label: string

	fileUploader: FileUploader = new FileUploader({ url: 'test'})

	isFileOverDropZone: boolean = false

	displayedColumns = ['filename', 'size', 'progress', 'status', 'actions']

	fileOverDropZone (e: any): void {
		this.isFileOverDropZone = e
	}
}
