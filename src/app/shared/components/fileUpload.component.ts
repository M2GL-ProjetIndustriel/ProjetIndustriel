import { Component, Input, EventEmitter, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import { of as observableOf } from 'rxjs/observable/of'
import { Md5 } from 'ts-md5/dist/md5'

import { CustomFile, FileQueue } from '../files.model'

/**
 * FileUploadComponent, a component composed of a drag and drop zone and a
 * input type="file" to add files. An array display the file added.
 */
@Component({
	selector: 'app-file-upload',
	templateUrl: './fileUpload.component.html',
	styleUrls: ['./fileUpload.component.css'],
})
export class FileUploadComponent implements OnInit {
	/**
	 * Number of file(s) allowed (-1 = infinite).
	 */
	@Input() nbFileMax: number = -1
	/**
	 * The validationColumn is a column that correspond to a specific need and
	 * by default is not displyed because it's not usefull in most cases.
	 */
	@Input() validationColumn: boolean = false
	/**
	 * Queue of file added.
	 */
	fileQueue: FileQueue = new FileQueue()
	/**
	 * Boolean representing if something is dragged over the drag and drop zone.
	 */
	isFileOverDropZone: boolean = false
	/**
	 * EventEmittern emit and event each time a file is added to the queue
	 */
	onFileAddedToQueue: EventEmitter<CustomFile> = new EventEmitter()

	/**
	 * Set the queue max length on the init based on the nbFileMax attribute.
	 */
	ngOnInit() {
		this.fileQueue.setQueueMaxLength(this.nbFileMax)
	}

	/**
	 * DragEnter event handler, change the isFileOverDropZone bool to true.
	 * @param  event An event.
	 */
	onDragEnter(event: any) {
		this.isFileOverDropZone = true
	}

	/**
	 * DragLeave event handler, change the isFileOverDropZone bool to flase.
	 * @param  event An event.
	 */
	onDragLeave(event: any) {
		this.isFileOverDropZone = false
	}

	/**
	 * DragOver event handler, prevent default to allow for the ondrop event.
	 * @param  event An event.
	 */
	onDragOver(event: any) {
		event.preventDefault()
	}

	/**
	 * Drop event handler, call the onFileAdded function to add the file dropped.
	 * @param  event An event.
	 */
	onDrop(event: any) {
		event.preventDefault()
		event.stopPropagation()
		this.isFileOverDropZone = false
		this.onFileAdded(null, event.dataTransfer.files)
	}

	/**
	 * Function handling the addition of file through the input element or
	 * the drag and drop zone. Add each file added to the queue (if possible)
	 * also emit an event for each file added and calc the md5 hash of the files
	 * added.
	 * @param  event    An event.
	 * @param  fileList A list of file, optional.
	 */
	onFileAdded(event: any, fileList?: FileList) {
		const files: Array<File> = Array.from((fileList) ? fileList : event.target.files)

		files.forEach((file) => {
			let fileAdded = this.fileQueue.add(file)
			if (fileAdded)
				this.onFileAddedToQueue.emit(fileAdded)
		})

		this.calcFileMd5()
	}

	/**
	 * Function calculing the Md5 hash of the files present in the queue that
	 * don't have their hash calculated yet.
	 */
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
