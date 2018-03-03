export class FileQueue {
	readonly queue: Array<CustomFile> = new Array()
	queueMaxLength: number = -1

	constructor(queueMaxLength?: number) {
		this.setQueueMaxLength(queueMaxLength)
	}

	setQueueMaxLength(queueMaxLength: number) {
		if (queueMaxLength && queueMaxLength > 0)
			this.queueMaxLength = queueMaxLength
	}

	add(file: File | CustomFile): CustomFile {
		if (this.queueMaxLength === -1 || this.queue.length < this.queueMaxLength) {
			if (file instanceof File)
				return this.queue[this.queue.push(new CustomFile(file, this)) - 1]

			if (file instanceof CustomFile) {
				file.setQueue(this)
				return this.queue[this.queue.push(file) - 1]
			}
		}
		return null
	}
}

export class CustomFile {
	md5Hash: string
	apiValidationStatus: ApiValidationStatus
	file: File
	queue: FileQueue

	constructor(file: File, queue?: FileQueue) {
		this.file = file
		this.queue = queue
	}

	remove() {
		if (this.queue) {
			let index = this.queue.queue.indexOf(this)
			if (index !== -1)
				this.queue.queue.splice(index, 1)
		}
	}

	setQueue(queue: FileQueue) {
		this.queue = queue
	}
}

export enum ApiValidationStatus {
	NotValidated = 1,
	Validated,
	FailedValidation
}
