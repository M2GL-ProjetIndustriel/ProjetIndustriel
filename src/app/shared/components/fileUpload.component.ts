import { Component, Input, EventEmitter } from '@angular/core'
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
	@Input() nbFileMax: number = -1

	@Input() validationColumn: boolean = false

	fileUploader: FileUploader = new FileUploader({})

	isFileOverDropZone: boolean = false

	onFileAddedToQueue: EventEmitter<File> = new EventEmitter()

	fileOverDropZone(e: any): void {
		this.isFileOverDropZone = e
	}

	onFileAdded(event: any):void {
		if (this.nbFileMax !== -1 && this.fileUploader.queue.length > this.nbFileMax)
			this.fileUploader.queue = this.fileUploader.queue.slice(0, this.nbFileMax)

		this.fileUploader.queue.forEach((value) => {
			if (!value.file.rawFile.md5Hash) {
				//calc md5
				this.calcFileMd5(value.file.rawFile)
			}
		})
	}

	calcFileMd5(file: any):void {
		let reader = new FileReader()
		reader.onloadend = () => {
			file.md5Hash = Md5.hashAsciiStr(reader.result)
			//emit event signaling file has been added
			this.onFileAddedToQueue.emit(file)
		}
		reader.readAsBinaryString(file)
	}
}
