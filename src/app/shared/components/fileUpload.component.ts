import { Component, Input, EventEmitter, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { of as observableOf } from 'rxjs/observable/of'
import { Md5 } from 'ts-md5/dist/md5'

import { CustomFile, FileQueue } from '../files.model'

@Component({
	selector: 'app-file-upload',
	templateUrl: './fileUpload.component.html',
	styleUrls: ['./fileUpload.component.css'],
})
export class FileUploadComponent implements OnInit {
	@Input() nbFileMax: number = -1

	@Input() validationColumn: boolean = false

	fileQueue: FileQueue = new FileQueue()

	isFileOverDropZone: boolean = false

	onFileAddedToQueue: EventEmitter<CustomFile> = new EventEmitter()

	ngOnInit() {
		this.fileQueue.setQueueMaxLength(this.nbFileMax)
	}

	onDragEnter(event: any) {
		this.isFileOverDropZone = true
	}
	onDragLeave(event: any) {
		this.isFileOverDropZone = false
	}
	onDragOver(event: any) {
		event.preventDefault()
	}
	onDrop(event: any) {
		event.preventDefault()
		event.stopPropagation()
		this.isFileOverDropZone = false
		this.onFileAdded(null, event.dataTransfer.files)
	}

	onFileAdded(event: any, fileList?: FileList) {
		const files: Array<File> = Array.from((fileList) ? fileList : event.target.files)

		files.forEach((file) => {
			let fileAdded = this.fileQueue.add(file)
			if (fileAdded)
				this.onFileAddedToQueue.emit(fileAdded)
		})

		this.calcFileMd5()
	}

	calcFileMd5() {
		this.fileQueue.queue.forEach((file) => {
			if (!file.md5Hash) {
				let reader = new FileReader()
				reader.onloadend = () => {
					file.md5Hash = Md5.hashAsciiStr(reader.result).toString()
				}
				reader.readAsBinaryString(file.file)
			}
		})
	}
}
