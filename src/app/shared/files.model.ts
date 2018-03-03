/**
 * FileQueue class, hold a queue of {@link CustomFile} (more like a list and
 * not a queue but w/e).
 */
export class FileQueue {
	/**
	 * Array of files.
	 */
	readonly queue: Array<CustomFile> = new Array()

	/**
	 * Max length of the queue. Default is -1.
	 *
	 * If the value is -1 there's no limit to the length of the queu, otherwise
	 * the limit is a value > 0 but the value can't be 0.
	 */
	queueMaxLength: number = -1

	/**
	 * Constructor, set the max length of the queue if provided.
	 * @param queueMaxLength Max length of the queue, optional.
	 */
	constructor(queueMaxLength?: number) {
		this.setQueueMaxLength(queueMaxLength)
	}

	/**
	 * Set the max length of the queue. Does not check if the new value
	 * is bigger or smaller than before, meaning that if the queue was bigger
	 * before the change the new queue will have a smaller max size but the
	 * content will remain the same which mean that there can be more
	 * elements in the queue than the max length allow.
	 * @param  queueMaxLength Max length of the queue.
	 */
	setQueueMaxLength(queueMaxLength: number) {
		if (queueMaxLength && queueMaxLength > 0)
			this.queueMaxLength = queueMaxLength
	}

	/**
	 * Add a file to the queue and return the file added.
	 * @param  file File to add can be a File or a CustomFile.
	 * @return      Return the custom file added or null if nothing was added.
	 */
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

/**
 * Custom file which is basically a file that has a Md5 hash and a validation
 * attribute. This type of file is purely for the need of validation with the
 * backend and should not be used in any other case.
 */
export class CustomFile {
	/**
	 * Md5 Hash of the file.
	 */
	md5Hash: string
	/**
	 * Status of the validation with the backend.
	 */
	apiValidationStatus: ApiValidationStatus
	/**
	 * The actual file.
	 */
	file: File
	/**
	 * Reference to the queue in which this file is present.
	 */
	queue: FileQueue

	/**
	 * Constructor.
	 * @param file  Actual file.
	 * @param queue Queue in which this file is present, optional.
	 */
	constructor(file: File, queue?: FileQueue) {
		this.file = file
		this.queue = queue
	}

	/**
	 * Remove function, remove this file form the queue it's in.
	 */
	remove() {
		if (this.queue) {
			let index = this.queue.queue.indexOf(this)
			if (index !== -1)
				this.queue.queue.splice(index, 1)
		}
	}

	/**
	 * Set the queue.
	 * @param  queue Queue in which this file is present.
	 */
	setQueue(queue: FileQueue) {
		this.queue = queue
	}
}

/**
 * Enum of the different states of the validation process.
 *
 * NotValidated: the file is not validated yet.
 *
 * Validated: the file has been validated by the backend and is valid.
 *
 * FailedValidation: the file has been validated by the backend and failed.
 */
export enum ApiValidationStatus {
	NotValidated = 1,
	Validated,
	FailedValidation
}
