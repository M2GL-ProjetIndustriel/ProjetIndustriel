import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { of as observableOf } from 'rxjs/observable/of'
import { FileUploader } from 'ng2-file-upload'
import { Md5 } from 'ts-md5/dist/md5'


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

	onFileAdded (event: any):void {
		this.calcFileMd5(event[0])
	}

	calcFileMd5 (file: any):void {
		console.time('start')
		let reader = new FileReader()
		reader.onloadend = () => {
			console.timeEnd('start')
			file.md5Hash = Md5.hashAsciiStr(reader.result)
		}
		reader.readAsBinaryString(file)
	}
}
